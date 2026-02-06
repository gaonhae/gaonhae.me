import { HeroSection } from "@/components/home/HeroSection";
import { RoutineWidget } from "@/components/home/RoutineWidget";
import { RecentActivity } from "@/components/home/RecentActivity";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />

      {/* Routine Widget */}
      <section className="container mx-auto px-4 py-8 border-t border-border">
        <div className="max-w-md mx-auto">
          <Suspense
            fallback={
              <div className="bg-card border border-border rounded-lg p-6 animate-pulse">
                <div className="h-4 bg-muted rounded w-1/3 mb-4" />
                <div className="h-2 bg-muted rounded w-full mb-2" />
                <div className="h-2 bg-muted rounded w-2/3" />
              </div>
            }
          >
            <RoutineWidget />
          </Suspense>
        </div>
      </section>

      {/* Recent Activity */}
      <Suspense
        fallback={
          <section className="container mx-auto px-4 py-12 border-t border-border">
            <h2 className="text-3xl font-bold mb-8">최근 활동</h2>
            <div className="grid md:grid-cols-2 gap-6 animate-pulse">
              <div className="h-48 bg-muted rounded-lg" />
              <div className="h-48 bg-muted rounded-lg" />
            </div>
          </section>
        }
      >
        <RecentActivity />
      </Suspense>
    </div>
  );
}
