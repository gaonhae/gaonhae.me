"use client";

import { useState } from "react";
import { ConsistencyGrid } from "./ConsistencyGrid";
import { Button } from "@/components/ui/button";

interface HabitVisualizationProps {
  aggregatedData: Record<string, number>;
  individualData: {
    운동: Record<string, number>;
    독서: Record<string, number>;
    코딩: Record<string, number>;
    명상: Record<string, number>;
  };
}

export function HabitVisualization({
  aggregatedData,
  individualData,
}: HabitVisualizationProps) {
  const [viewMode, setViewMode] = useState<"combined" | "individual">("combined");

  return (
    <div className="space-y-6">
      {/* View toggle */}
      <div className="flex items-center gap-3">
        <Button
          variant={viewMode === "combined" ? "default" : "outline"}
          onClick={() => setViewMode("combined")}
          size="sm"
        >
          전체 보기
        </Button>
        <Button
          variant={viewMode === "individual" ? "default" : "outline"}
          onClick={() => setViewMode("individual")}
          size="sm"
        >
          습관별 보기
        </Button>
      </div>

      {/* Combined view */}
      {viewMode === "combined" && (
        <div>
          <h3 className="text-lg font-semibold mb-4">전체 습관 완료 현황</h3>
          <ConsistencyGrid data={aggregatedData} mode="aggregated" />
        </div>
      )}

      {/* Individual view */}
      {viewMode === "individual" && (
        <div className="space-y-8">
          {Object.entries(individualData).map(([habitName, data]) => (
            <div key={habitName}>
              <h3 className="text-lg font-semibold mb-4">{habitName}</h3>
              <ConsistencyGrid data={data} mode="individual" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
