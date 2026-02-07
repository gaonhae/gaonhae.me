import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

interface HabitCardProps {
  habitName: string;
  date: string;
  initialStatus: boolean;
  icon: React.ReactNode;
}

export function HabitCard({ habitName, date, initialStatus, icon }: HabitCardProps) {
  return (
    <Card className="transition-all hover:shadow-md">
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
