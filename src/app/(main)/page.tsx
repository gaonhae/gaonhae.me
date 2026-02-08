import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { AboutSection } from "@/components/home/AboutSection";
import { RoutineWidget } from "@/components/home/RoutineWidget";
import { RecentActivity } from "@/components/home/RecentActivity";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Projects Section */}
      <FeaturedProjects />

      {/* About Section */}
      <Suspense
        fallback={
          <section className="w-full max-w-[1200px] px-6 py-24 flex flex-col items-center text-center">
            <div className="max-w-[800px] space-y-8 animate-pulse">
              <div className="h-12 bg-muted rounded w-3/4 mx-auto mb-20" />
              <div className="h-6 bg-muted rounded w-full mb-2" />
              <div className="h-6 bg-muted rounded w-full mb-2" />
              <div className="h-6 bg-muted rounded w-full mb-2" />
              <div className="h-6 bg-muted rounded w-2/3 mx-auto" />

              <div className="flex flex-wrap justify-center gap-10 pt-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div className="h-9 w-16 bg-muted rounded" />
                    <div className="h-4 w-20 bg-muted rounded" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        }
      >
        <AboutSection />
      </Suspense>

      {/* Routine Widget */}
      <section className="w-full border-t border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
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
        </div>
      </section>

      {/* Recent Activity */}
      <Suspense
        fallback={
          <section className="container mx-auto px-4 py-12">
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
