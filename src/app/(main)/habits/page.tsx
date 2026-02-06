import { getHabitsByDate } from "@/actions/habits";
import { HabitCard } from "@/components/habits/HabitCard";
import { format } from "date-fns";

export const metadata = {
  title: "Habits - gaonhae.me",
  description: "일일 습관 추적 대시보드",
};

export const dynamic = "force-dynamic";

export default async function HabitsPage() {
  const today = format(new Date(), "yyyy-MM-dd");
  const habits = await getHabitsByDate(today);

  // Define default habits
  const defaultHabits = ["운동", "독서", "코딩", "명상"];

  // Create habit map
  const habitMap = new Map(habits.map((h) => [h.habit_name, h.status]));

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">습관 트래커</h1>
          <p className="text-lg text-muted-foreground">
            오늘의 습관을 체크하고 성장을 기록하세요
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {format(new Date(), "yyyy년 MM월 dd일 (EEE)")}
          </p>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">오늘의 습관</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {defaultHabits.map((habitName) => (
                <HabitCard
                  key={habitName}
                  habitName={habitName}
                  date={today}
                  initialStatus={habitMap.get(habitName) || false}
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
                </div>
                <div className="text-sm text-muted-foreground">오늘 완료</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="text-2xl font-bold text-primary">{defaultHabits.length}</div>
                <div className="text-sm text-muted-foreground">전체 습관</div>
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
                <div className="text-2xl font-bold text-primary">365</div>
                <div className="text-sm text-muted-foreground">연속 일수</div>
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
