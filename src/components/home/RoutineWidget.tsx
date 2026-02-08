import { getHabits, getHabitsByDate } from "@/actions/habits";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ConsistencyGrid } from "@/components/habits/ConsistencyGrid";
import { Check, Circle } from "lucide-react";
import { format, subDays } from "date-fns";
import type { Habit } from "@/types";

function transformHabitsToGridData(habits: Habit[]): Record<string, number> {
  const gridData: Record<string, number> = {};

  console.log('[transformHabitsToGridData] Processing', habits.length, 'habits');

  habits.forEach((habit) => {
    console.log('[transformHabitsToGridData] Habit:', {
      name: habit.habit_name,
      status: habit.status,
      date: habit.date
    });

    if (habit.status) {  // 완료된 습관만 카운트
      if (!gridData[habit.date]) {
        gridData[habit.date] = 0;
      }
      gridData[habit.date]++;
    }
  });

  console.log('[transformHabitsToGridData] Result:', gridData);
  return gridData;
}

export async function RoutineWidget() {
  const today = format(new Date(), "yyyy-MM-dd");
  const twoWeeksAgo = format(subDays(new Date(), 13), "yyyy-MM-dd"); // 13일 전 + 오늘 = 14일

  // 오늘의 습관 (기존 체크리스트용)
  const todayHabits = await getHabitsByDate(today);

  // 2주 간의 습관 (잔디 그래프용)
  const allHabits = await getHabits(twoWeeksAgo, today);

  // 🆕 디버깅 로그 추가
  console.log('[RoutineWidget] Date range:', { twoWeeksAgo, today });
  console.log('[RoutineWidget] Fetched habits:', allHabits.length, 'records');
  console.log('[RoutineWidget] Sample data:', allHabits.slice(0, 3));

  const gridData = transformHabitsToGridData(allHabits);
  console.log('[RoutineWidget] Grid data:', gridData);
  console.log('[RoutineWidget] Date keys in gridData:', Object.keys(gridData));

  const defaultHabits = ["운동", "독서", "코딩", "명상"];
  const habitMap = new Map(todayHabits.map((h) => [h.habit_name, h.status]));

  const completedCount = defaultHabits.filter((name) => habitMap.get(name)).length;
  const totalCount = defaultHabits.length;
  const percentage = Math.round((completedCount / totalCount) * 100);

  return (
    <Card className="w-fit mx-auto">
      <CardHeader className="gap-0">
        <CardTitle className="text-xl">My Routinary Life</CardTitle>
        <CardDescription className="pb-10 border-b-3 border-gray-100">Today : {format(new Date(), "yyyy-MM-dd (EEE)")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-6">
          {/* 왼쪽: 지난 2주 활동 */}
          <div className="mr-2">
            <h3 className="ml-1 text-sm font-medium text-muted-foreground mb-3">
              지난 2주 활동
            </h3>
            <div>
              <ConsistencyGrid data={gridData} weeks={2} layout="horizontal" cellSize="medium" showWeekdayLabels={false} />
            </div>
          </div>

          {/* 오른쪽: 오늘의 루틴 */}
          <div className="space-y-4 min-w-[200px] ml-2">
            {/* Progress Bar */}
            <div className="space-y-2 mb-10">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">오늘의 진행률</span>
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
