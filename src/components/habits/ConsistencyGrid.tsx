"use client";

import { useState } from "react";
import { format, subDays, startOfWeek, addDays } from "date-fns";

interface ConsistencyGridProps {
  data: Record<string, number>; // date -> count (0-4+ for aggregated, 0-1 for individual)
  weeks?: number;
  mode?: "aggregated" | "individual"; // aggregated: 0-4 scale, individual: 0-1 binary
  layout?: "vertical" | "horizontal"; // vertical: 7 rows × N weeks, horizontal: N rows × 7 cols
  cellSize?: "default" | "medium" | "large"; // default: 27px, medium: 40px, large: 54px
  showWeekdayLabels?: boolean; // Show weekday labels (default: true)
}

export function ConsistencyGrid({ data, weeks = 26, mode = "aggregated", layout = "vertical", cellSize = "default", showWeekdayLabels = true }: ConsistencyGridProps) {
  const [hoveredCell, setHoveredCell] = useState<{
    date: string;
    count: number;
    x: number;
    y: number;
  } | null>(null);

  // Calculate the date range
  const endDate = new Date();
  const startDate = subDays(endDate, weeks * 7);
  const firstDay = addDays(startOfWeek(startDate, { weekStartsOn: 0 }), 7); // Sunday + 7 days to shift forward

  // Generate grid data
  const gridData: Array<Array<{ date: Date; count: number }>> = [];

  if (layout === "horizontal") {
    // Horizontal layout: N rows (weeks) × 7 columns (days)
    // Initialize N rows (one for each week)
    for (let week = 0; week < weeks; week++) {
      gridData.push([]);
    }
    // Populate each week row with 7 day cells
    for (let week = 0; week < weeks; week++) {
      for (let day = 0; day < 7; day++) {
        const date = addDays(firstDay, week * 7 + day);
        const dateStr = format(date, "yyyy-MM-dd");
        const count = data[dateStr] || 0;
        gridData[week].push({ date, count });
      }
    }
  } else {
    // Vertical layout: 7 rows (days) × N columns (weeks)
    // Initialize 7 rows (one for each day of the week)
    for (let day = 0; day < 7; day++) {
      gridData.push([]);
    }
    // Populate each day row with week cells
    for (let week = 0; week < weeks; week++) {
      for (let day = 0; day < 7; day++) {
        const date = addDays(firstDay, week * 7 + day);
        const dateStr = format(date, "yyyy-MM-dd");
        const count = data[dateStr] || 0;
        gridData[day].push({ date, count });
      }
    }
  }

  // Get color class based on count and mode
  const getColorClass = (count: number) => {
    if (mode === "individual") {
      // Binary mode: 0 or 1
      if (count === 0) return "bg-muted";
      return "bg-primary";
    } else {
      // Aggregated mode: 0-4 scale
      if (count === 0) return "bg-muted";
      if (count === 1) return "bg-primary/20";
      if (count === 2) return "bg-primary/40";
      if (count === 3) return "bg-primary/70";
      return "bg-primary";
    }
  };

  // Get cell size classes based on cellSize prop
  const getCellSizeClasses = () => {
    if (cellSize === "large") {
      return "w-[54px] h-[54px] md:w-[54px] md:h-[54px] sm:w-[36px] sm:h-[36px]";
    }
    if (cellSize === "medium") {
      return "w-[40px] h-[40px] md:w-[40px] md:h-[40px] sm:w-[27px] sm:h-[27px]";
    }
    return "w-[27px] h-[27px] md:w-[27px] md:h-[27px] sm:w-[18px] sm:h-[18px]";
  };

  const getLabelSizeClasses = () => {
    if (cellSize === "large") {
      return {
        width: "w-[54px] md:w-[54px] sm:w-[36px]",
        height: "h-[54px] md:h-[54px] sm:h-[36px]",
      };
    }
    if (cellSize === "medium") {
      return {
        width: "w-[40px] md:w-[40px] sm:w-[27px]",
        height: "h-[40px] md:h-[40px] sm:h-[27px]",
      };
    }
    return {
      width: "w-[27px] md:w-[27px] sm:w-[18px]",
      height: "h-[27px] md:h-[27px] sm:h-[18px]",
    };
  };

  return (
    <div className="relative w-full">
      {/* Horizontal scroll container */}
      <div className="overflow-x-auto pb-4">
        <div className="inline-flex flex-col" >
          {/* Day labels - conditional rendering based on layout */}
          {showWeekdayLabels && layout === "horizontal" && (
            // Horizontal layout: labels on top
            <div className="flex gap-1 mb-2">
              <div className="w-9 mr-2" /> {/* Spacer to align with vertical layout label area */}
              <div className="flex gap-1">
                {["일", "월", "화", "수", "목", "금", "토"].map((day, i) => (
                  <div
                    key={i}
                    className={`${getLabelSizeClasses().width} text-xs text-muted-foreground text-center`}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Grid container with side labels for vertical layout */}
          <div className="inline-flex">
            {showWeekdayLabels && layout === "vertical" && (
              // Vertical layout: labels on left
              <div className="flex flex-col gap-1 mr-2 justify-start pt-0">
                {["일", "월", "화", "수", "목", "금", "토"].map((day, i) => (
                  <div
                    key={i}
                    className={`${getLabelSizeClasses().height} w-9 text-xs text-muted-foreground flex items-center justify-start`}
                  >
                    {day}
                  </div>
                ))}
              </div>
            )}

            {/* Grid */}
            <div className="ml-1 flex flex-col gap-1">
            {gridData.map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-1">
                {row.map((cell, colIndex) => {
                  const dateStr = format(cell.date, "yyyy-MM-dd");
                  const isFuture = cell.date > endDate;

                  return (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className={`${getCellSizeClasses()} rounded-sm transition-all cursor-pointer ${
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
                      title={`${dateStr}: ${mode === "individual" ? (cell.count ? "완료" : "미완료") : `${cell.count}개 완료`}`}
                    />
                  );
                })}
              </div>
            ))}
            </div>
          </div>
        </div>

        {/* Legend - only show for aggregated mode */}
        {mode === "aggregated" && (
          <div className="flex items-center justify-center gap-2 mt-6 text-xs text-muted-foreground">
            <span>적음</span>
            <div className="flex gap-1">
              <div className="w-[18px] h-[18px] rounded-sm bg-muted" />
              <div className="w-[18px] h-[18px] rounded-sm bg-primary/20" />
              <div className="w-[18px] h-[18px] rounded-sm bg-primary/40" />
              <div className="w-[18px] h-[18px] rounded-sm bg-primary/70" />
              <div className="w-[18px] h-[18px] rounded-sm bg-primary" />
            </div>
            <span>많음</span>
          </div>
        )}
      </div>

      {/* Tooltip */}
      {hoveredCell && (
        <div
          className="fixed z-50 bg-popover text-popover-foreground border border-border rounded-md px-3 py-2 text-sm shadow-lg pointer-events-none"
          style={{
            left: hoveredCell.x,
            top: hoveredCell.y - 50,
            transform: "translateX(-50%)",
          }}
        >
          <div className="font-semibold">{hoveredCell.date}</div>
          <div className="text-muted-foreground">
            {mode === "individual"
              ? (hoveredCell.count ? "완료" : "미완료")
              : `${hoveredCell.count}개 완료`}
          </div>
        </div>
      )}
    </div>
  );
}
