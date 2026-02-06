import Link from "next/link";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    title: "Habit Tracker",
    description: "일상의 습관을 추적하고 데이터를 시각화하는 미니멀 습관 관리 앱",
    tech: "React, Next.js, Supabase",
    image: "bg-gradient-to-br from-blue-500/20 to-purple-500/20",
  },
  {
    title: "개인 블로그",
    description: "MDX 기반의 기술 블로그로 개발 여정과 학습 내용을 기록합니다",
    tech: "Next.js, MDX, Tailwind",
    image: "bg-gradient-to-br from-green-500/20 to-teal-500/20",
  },
  {
    title: "포트폴리오 플랫폼",
    description: "프로젝트, 블로그, 습관 관리를 통합한 개인 브랜드 플랫폼",
    tech: "Next.js, TypeScript",
    image: "bg-gradient-to-br from-primary/20 to-yellow-500/20",
  },
];

export function FeaturedProjects() {
  return (
    <section className="w-full bg-muted/50 py-20 flex justify-center">
      <div className="max-w-[1200px] w-full px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-primary font-bold text-sm tracking-widest uppercase">
              Portfolio
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mt-2">
              Featured Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="text-primary font-semibold flex items-center gap-2 hover:underline transition-all"
          >
            모든 프로젝트 보기 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group flex flex-col bg-background rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border"
            >
              <div
                className={`w-full aspect-[4/3] ${project.image} transition-transform duration-500 group-hover:scale-105 flex items-center justify-center backdrop-blur-sm`}
              >
                <div className="text-6xl font-black text-foreground/10">
                  {index + 1}
                </div>
              </div>
              <div className="p-6 flex flex-col gap-2">
                <p className="text-muted-foreground text-xs font-bold uppercase tracking-wider">
                  {project.tech}
                </p>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
