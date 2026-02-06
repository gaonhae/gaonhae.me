import { getHabitsByDate } from "@/actions/habits";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Circle } from "lucide-react";
import { format } from "date-fns";

export async function RoutineWidget() {
  const today = format(new Date(), "yyyy-MM-dd");
  const habits = await getHabitsByDate(today);

  const defaultHabits = ["운동", "독서", "코딩", "명상"];
  const habitMap = new Map(habits.map((h) => [h.habit_name, h.status]));

  const completedCount = defaultHabits.filter((name) => habitMap.get(name)).length;
  const totalCount = defaultHabits.length;
  const percentage = Math.round((completedCount / totalCount) * 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle>오늘의 루틴</CardTitle>
        <CardDescription>{format(new Date(), "yyyy-MM-dd (EEE)")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">진행률</span>
            <span className="font-semibold">
              {completedCount} / {totalCount} ({percentage}%)
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Habit List */}
        <div className="space-y-2">
          {defaultHabits.map((habitName) => {
            const isCompleted = habitMap.get(habitName) || false;
            return (
              <div
                key={habitName}
                className="flex items-center gap-2 text-sm"
              >
                {isCompleted ? (
                  <Check className="h-4 w-4 text-primary" />
                ) : (
                  <Circle className="h-4 w-4 text-muted-foreground" />
                )}
                <span
                  className={
                    isCompleted
                      ? "text-foreground font-medium"
                      : "text-muted-foreground"
                  }
                >
                  {habitName}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
