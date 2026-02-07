import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

interface HabitCardProps {
  habitName: string;
  date: string;
  initialStatus: boolean;
  icon: React.ReactNode;
  streak?: number;
}

export function HabitCard({ habitName, date, initialStatus, icon, streak }: HabitCardProps) {
  return (
    <Card className="relative overflow-hidden transition-all hover:shadow-md">
      {/* Streak Badge */}
      {streak !== undefined && streak > 0 && (
        <div className="absolute top-1/2 -translate-y-1/2 right-4 flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
          <span>🔥</span>
          <span>{streak} Days</span>
        </div>
      )}

      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-4">
          <div className="relative w-16 h-16 flex-shrink-0">
            {/* 기본 아이콘 */}
            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-muted text-muted-foreground">
              {icon}
            </div>

            {/* 완료 시 오버레이 */}
            {initialStatus && (
              <div
                className="absolute inset-0 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(116, 161, 46, 0.5)' }}
              >
                <Check className="h-8 w-8 text-white" />
              </div>
            )}
          </div>
          <span>{habitName}</span>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
