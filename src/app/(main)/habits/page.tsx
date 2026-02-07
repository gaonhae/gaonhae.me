import { getHabitsByDate, getTotalCompletedHabits, getAllHabitStreaks, getLongestStreakOverall } from "@/actions/habits";
import { HabitCard } from "@/components/habits/HabitCard";
import { format } from "date-fns";
import { Dumbbell, BookOpen, Code, Brain } from "lucide-react";

export const metadata = {
  title: "Habits - gaonhae.me",
  description: "일일 습관 추적 대시보드",
};

export const dynamic = "force-dynamic";

export default async function HabitsPage() {
  const today = format(new Date(), "yyyy-MM-dd");
  const habits = await getHabitsByDate(today);
  const totalCompleted = await getTotalCompletedHabits();

  // Define default habits with icons
  const defaultHabits = [
    { name: "운동", icon: <Dumbbell className="h-8 w-8" /> },
    { name: "독서", icon: <BookOpen className="h-8 w-8" /> },
    { name: "코딩", icon: <Code className="h-8 w-8" /> },
    { name: "명상", icon: <Brain className="h-8 w-8" /> },
  ];

  // Create habit map
  const habitMap = new Map(habits.map((h) => [h.habit_name, h.status]));

  // Fetch streak data for all habits
  const streaks = await getAllHabitStreaks(["운동", "독서", "코딩", "명상"]);

  // Fetch longest streak across all habits
  const longestStreak = await getLongestStreakOverall();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-1">습관 트래커</h1>
          <p className="text-lg text-muted-foreground">
            작은 습관이 만들어가는 성공의 복리를 직접 지켜보세요
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {format(new Date(), "yyyy년 MM월 dd일 (EEE)")}
          </p>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold flex items-center gap-3 mb-4">
              오늘의 습관
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-white text-sm font-medium tracking-[0.1em]"
                style={{ backgroundColor: '#74A12E' }}
              >
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-[pulse-live_2s_ease-in-out_infinite]"></span>
                live
              </span>
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {defaultHabits.map((habit) => (
                <HabitCard
                  key={habit.name}
                  habitName={habit.name}
                  date={today}
                  initialStatus={habitMap.get(habit.name) || false}
                  icon={habit.icon}
                  streak={streaks[habit.name]}
                />
              ))}
            </div>
          </section>

          <section className="border-t border-border pt-8">
            <h2 className="text-2xl font-semibold mb-4">습관 통계</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="text-2xl font-bold text-primary">
                  {habits.filter((h) => h.status).length}
                  <span className="text-gray-400"> /4</span>
                </div>
                <div className="text-sm text-muted-foreground">오늘 완료</div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="text-2xl font-bold text-primary">
                  {Math.round(
                    (habits.filter((h) => h.status).length / defaultHabits.length) * 100
                  )}
                  %
                </div>
                <div className="text-sm text-muted-foreground">달성률</div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="text-2xl font-bold text-primary">{totalCompleted}</div>
                <div className="text-sm text-muted-foreground">총 실천 습관</div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="text-2xl font-bold text-primary">
                  {longestStreak}일
                </div>
                <div className="text-sm text-muted-foreground">최장 스트릭</div>
              </div>
            </div>
          </section>

          <section className="border-t border-border pt-8">
            <h2 className="text-2xl font-semibold mb-4">시각화</h2>
            <p className="text-muted-foreground">
              깃허브 잔디 스타일 시각화와 차트는 다음 단계에서 구현됩니다.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
