import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-20 md:py-32">
      <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            안녕하세요,{" "}
            <span className="text-primary">가온해</span>입니다
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            기획-개발-운영-자기관리를 통합하는
          </p>
          <p className="text-2xl md:text-3xl font-semibold text-foreground">
            성장형 메이커 (Growing Maker)
          </p>
        </div>

        <p className="text-lg text-muted-foreground max-w-2xl">
          단순 포트폴리오를 넘어, 개발 프로젝트부터 자기관리까지 모든 과정을 기록하고 공유하는
          개인 브랜드 플랫폼입니다. 배움과 성장의 여정을 함께 나누고 싶습니다.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link href="/projects">
            <Button size="lg" className="w-full sm:w-auto">
              프로젝트 보기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/blog">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              블로그 읽기
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 w-full">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">4+</div>
            <div className="text-sm text-muted-foreground">프로젝트</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">20+</div>
            <div className="text-sm text-muted-foreground">블로그 포스트</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">365</div>
            <div className="text-sm text-muted-foreground">일일 루틴</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">100%</div>
            <div className="text-sm text-muted-foreground">성장 열정</div>
          </div>
        </div>
      </div>
    </section>
  );
}
