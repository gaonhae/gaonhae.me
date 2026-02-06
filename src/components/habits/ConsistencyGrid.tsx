"use client";

import { useState } from "react";
import { format, subDays, startOfWeek, addDays } from "date-fns";

interface ConsistencyGridProps {
  data: Record<string, number>; // date -> count (0-4+)
  weeks?: number;
}

export function ConsistencyGrid({ data, weeks = 15 }: ConsistencyGridProps) {
  const [hoveredCell, setHoveredCell] = useState<{
    date: string;
    count: number;
    x: number;
    y: number;
  } | null>(null);

  // Calculate the date range
  const endDate = new Date();
  const startDate = subDays(endDate, weeks * 7);
  const firstDay = startOfWeek(startDate, { weekStartsOn: 0 }); // Sunday

  // Generate grid data
  const gridData: Array<Array<{ date: Date; count: number }>> = [];

  for (let week = 0; week < weeks; week++) {
    const weekData: Array<{ date: Date; count: number }> = [];
    for (let day = 0; day < 7; day++) {
      const date = addDays(firstDay, week * 7 + day);
      const dateStr = format(date, "yyyy-MM-dd");
      const count = data[dateStr] || 0;
      weekData.push({ date, count });
    }
    gridData.push(weekData);
  }

  // Get color class based on count
  const getColorClass = (count: number) => {
    if (count === 0) return "bg-muted";
    if (count === 1) return "bg-primary/20";
    if (count === 2) return "bg-primary/40";
    if (count === 3) return "bg-primary/70";
    return "bg-primary";
  };

  return (
    <div className="relative">
      <div className="inline-block">
        {/* Day labels */}
        <div className="flex mb-2">
          <div className="w-8" /> {/* Spacer for week labels */}
          <div className="flex-1 flex gap-1">
            {["일", "월", "화", "수", "목", "금", "토"].map((day, i) => (
              <div key={i} className="w-3 h-3 text-[10px] text-muted-foreground text-center">
                {i % 2 === 0 ? day : ""}
              </div>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="flex gap-1">
          {/* Week numbers (optional) */}
          <div className="flex flex-col gap-1">
            {gridData.map((_, weekIndex) => (
              <div key={weekIndex} className="h-3" />
            ))}
          </div>

          {/* Weeks */}
          <div className="flex gap-1">
            {gridData.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((cell, dayIndex) => {
                  const dateStr = format(cell.date, "yyyy-MM-dd");
                  const isFuture = cell.date > endDate;

                  return (
                    <div
                      key={`${weekIndex}-${dayIndex}`}
                      className={`w-3 h-3 rounded-sm transition-all cursor-pointer ${
                        isFuture
                          ? "bg-muted/30 opacity-30"
                          : getColorClass(cell.count)
                      } hover:ring-2 hover:ring-primary hover:ring-offset-1`}
                      onMouseEnter={(e) => {
                        if (!isFuture) {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setHoveredCell({
                            date: dateStr,
                            count: cell.count,
                            x: rect.left,
                            y: rect.top,
                          });
                        }
                      }}
                      onMouseLeave={() => setHoveredCell(null)}
                      title={`${dateStr}: ${cell.count}개 완료`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
          <span>적음</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-muted" />
            <div className="w-3 h-3 rounded-sm bg-primary/20" />
            <div className="w-3 h-3 rounded-sm bg-primary/40" />
            <div className="w-3 h-3 rounded-sm bg-primary/70" />
            <div className="w-3 h-3 rounded-sm bg-primary" />
          </div>
          <span>많음</span>
        </div>
      </div>

      {/* Tooltip */}
      {hoveredCell && (
        <div
          className="fixed z-50 bg-popover text-popover-foreground border border-border rounded-md px-3 py-2 text-sm shadow-lg pointer-events-none"
          style={{
            left: hoveredCell.x,
            top: hoveredCell.y - 40,
            transform: "translateX(-50%)",
          }}
        >
          <div className="font-semibold">{hoveredCell.date}</div>
          <div className="text-muted-foreground">{hoveredCell.count}개 완료</div>
        </div>
      )}
    </div>
  );
}
