"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { toggleHabit } from "@/actions/habits";
import { useState } from "react";
import type { Habit } from "@/types";

interface HabitCardProps {
  habitName: string;
  date: string;
  initialStatus: boolean;
  onToggle?: () => void;
}

export function HabitCard({ habitName, date, initialStatus, onToggle }: HabitCardProps) {
  const [status, setStatus] = useState(initialStatus);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      await toggleHabit(habitName, date);
      setStatus(!status);
      onToggle?.();
    } catch (error) {
      console.error("Error toggling habit:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>{habitName}</span>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              status
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {status ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Button
          onClick={handleToggle}
          disabled={isLoading}
          variant={status ? "outline" : "default"}
          className="w-full"
        >
          {isLoading ? "처리중..." : status ? "완료 취소" : "완료 체크"}
        </Button>
      </CardContent>
    </Card>
  );
}
