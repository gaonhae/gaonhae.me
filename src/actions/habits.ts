"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
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
