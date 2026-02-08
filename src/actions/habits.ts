"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { cache } from "react";
import { format, subDays } from "date-fns";
import type { Habit, Inserts, Updates } from "@/types";

export async function getHabits(startDate?: string, endDate?: string) {
  const supabase = await createClient();

  let query = supabase.from("habits").select("*").order("date", { ascending: false });

  if (startDate) {
    query = query.gte("date", startDate);
  }

  if (endDate) {
    query = query.lte("date", endDate);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching habits:", error);
    return [];
  }

  return data as Habit[];
}

export async function getHabitsByDate(date: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("habits")
    .select("*")
    .eq("date", date)
    .order("habit_name", { ascending: true });

  if (error) {
    console.error("Error fetching habits by date:", error);
    return [];
  }

  return data as Habit[];
}

export async function getHabitsByName(habitName: string, startDate?: string, endDate?: string) {
  const supabase = await createClient();

  let query = supabase
    .from("habits")
    .select("*")
    .eq("habit_name", habitName)
    .order("date", { ascending: false });

  if (startDate) {
    query = query.gte("date", startDate);
  }

  if (endDate) {
    query = query.lte("date", endDate);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching habits by name:", error);
    return [];
  }

  return data as Habit[];
}

export async function createHabit(habit: Inserts<"habits">) {
  const supabase = await createClient();

  const { data, error } = await supabase.from("habits").insert(habit).select().single();

  if (error) {
    console.error("Error creating habit:", error);
    throw new Error(error.message);
  }

  revalidatePath("/habits");
  return data as Habit;
}

export async function toggleHabit(habitName: string, date: string) {
  const supabase = await createClient();

  // First, try to get the existing habit
  const { data: existing } = await supabase
    .from("habits")
    .select("*")
    .eq("habit_name", habitName)
    .eq("date", date)
    .single();

  if (existing) {
    // Update existing habit
    const { data, error } = await supabase
      .from("habits")
      .update({ status: !existing.status })
      .eq("id", existing.id)
      .select()
      .single();

    if (error) {
      console.error("Error toggling habit:", error);
      throw new Error(error.message);
    }

    revalidatePath("/habits");
    return data as Habit;
  } else {
    // Create new habit with status true
    return createHabit({ habit_name: habitName, date, status: true });
  }
}

export async function updateHabit(id: string, updates: Updates<"habits">) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("habits")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating habit:", error);
    throw new Error(error.message);
  }

  revalidatePath("/habits");
  return data as Habit;
}

export async function deleteHabit(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("habits").delete().eq("id", id);

  if (error) {
    console.error("Error deleting habit:", error);
    throw new Error(error.message);
  }

  revalidatePath("/habits");
}

// Get habit statistics
export async function getHabitStats(habitName: string, days: number = 30) {
  const supabase = await createClient();

  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const { data, error } = await supabase
    .from("habits")
    .select("*")
    .eq("habit_name", habitName)
    .gte("date", startDate.toISOString().split("T")[0])
    .lte("date", endDate.toISOString().split("T")[0]);

  if (error) {
    console.error("Error fetching habit stats:", error);
    return { total: 0, completed: 0, rate: 0 };
  }

  const total = days;
  const completed = data.filter((h) => h.status).length;
  const rate = Math.round((completed / total) * 100);

  return { total, completed, rate };
}

// Get total number of completed habits (status=true) across all time
export async function getTotalCompletedHabits(): Promise<number> {
  const supabase = await createClient();

  const { count, error } = await supabase
    .from("habits")
    .select("*", { count: "exact", head: true })
    .eq("status", true);

  if (error) {
    console.error("Error fetching total completed habits:", error);
    return 0;
  }

  return count || 0;
}

// Helper function to calculate streak from habit data
function calculateStreak(habits: { date: string; status: boolean }[]): number {
  const today = format(new Date(), "yyyy-MM-dd");

  if (!habits.length) return 0;

  let streak = 0;
  let expectedDate = new Date(today);

  // Determine starting point
  if (habits[0].date === today) {
    if (habits[0].status) {
      // Today completed - count it and continue
      streak = 1;
      expectedDate = subDays(expectedDate, 1);
    } else {
      // Today not completed - start counting from yesterday
      expectedDate = subDays(expectedDate, 1);
    }
  } else {
    // Today's data doesn't exist - start counting from yesterday
    expectedDate = subDays(expectedDate, 1);
  }

  // Count consecutive days from yesterday backwards
  for (const habit of habits) {
    const habitDate = habit.date;

    // Skip today if we already processed it
    if (habitDate === today) continue;

    const expectedDateStr = format(expectedDate, "yyyy-MM-dd");

    if (habitDate === expectedDateStr && habit.status) {
      streak++;
      expectedDate = subDays(expectedDate, 1);
    } else if (habitDate < expectedDateStr) {
      // Gap found - stop counting
      break;
    }
  }

  return streak;
}

// Get streak for a single habit (with React cache for request-level deduplication)
export const getHabitStreak = cache(async (habitName: string): Promise<number> => {
  const supabase = await createClient();
  const today = format(new Date(), "yyyy-MM-dd");
  const startDate = format(subDays(new Date(), 180), "yyyy-MM-dd");

  const { data, error } = await supabase
    .from("habits")
    .select("date, status")
    .eq("habit_name", habitName)
    .gte("date", startDate)
    .lte("date", today)
    .order("date", { ascending: false });

  if (error || !data) return 0;
  return calculateStreak(data);
});

// Get streaks for multiple habits
export async function getAllHabitStreaks(
  habitNames: string[]
): Promise<Record<string, number>> {
  const streaks = await Promise.all(
    habitNames.map(async (name) => ({
      name,
      streak: await getHabitStreak(name),
    }))
  );

  return Object.fromEntries(streaks.map((s) => [s.name, s.streak]));
}

// Helper function to calculate longest streak from habit data
function calculateLongestStreak(habits: { date: string; status: boolean }[]): number {
  if (!habits.length) return 0;

  let maxStreak = 0;
  let currentStreak = 0;
  let previousDate: Date | null = null;

  // Reverse to process oldest → newest
  const sortedHabits = [...habits].reverse();

  for (const habit of sortedHabits) {
    if (!habit.status) {
      currentStreak = 0;
      previousDate = null;
      continue;
    }

    const currentDate = new Date(habit.date);

    if (previousDate === null) {
      currentStreak = 1;
    } else {
      const daysDiff = Math.floor(
        (currentDate.getTime() - previousDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysDiff === 1) {
        currentStreak++;
      } else {
        currentStreak = 1;
      }
    }

    maxStreak = Math.max(maxStreak, currentStreak);
    previousDate = currentDate;
  }

  return maxStreak;
}

// Get longest streak for a single habit (with React cache for request-level deduplication)
export const getLongestHabitStreak = cache(async (habitName: string): Promise<number> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("habits")
    .select("date, status")
    .eq("habit_name", habitName)
    .order("date", { ascending: false });

  if (error || !data) return 0;
  return calculateLongestStreak(data);
});

// Get longest streak across all habits
export async function getLongestStreakOverall(): Promise<number> {
  const habitNames = ["운동", "독서", "코딩", "명상"];

  const streaks = await Promise.all(
    habitNames.map(name => getLongestHabitStreak(name))
  );

  return Math.max(...streaks, 0);
}

// Get aggregated habit data for visualization (date → total completed habits count)
export const getAggregatedHabitData = cache(async (
  startDate: string,
  endDate: string
): Promise<Record<string, number>> => {
  const habits = await getHabits(startDate, endDate);

  // Group by date and count completed habits
  const aggregated: Record<string, number> = {};

  for (const habit of habits) {
    if (!habit.date) continue;

    if (!aggregated[habit.date]) {
      aggregated[habit.date] = 0;
    }

    if (habit.status) {
      aggregated[habit.date] += 1;
    }
  }

  return aggregated;
});

// Get individual habit data for visualization (date → binary completion)
export const getIndividualHabitGridData = cache(async (
  habitName: string,
  startDate: string,
  endDate: string
): Promise<Record<string, number>> => {
  const habits = await getHabitsByName(habitName, startDate, endDate);

  // Transform to date → binary (0 or 1)
  const gridData: Record<string, number> = {};

  for (const habit of habits) {
    if (!habit.date) continue;
    gridData[habit.date] = habit.status ? 1 : 0;
  }

  return gridData;
});
