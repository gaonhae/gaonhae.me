import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 py-16 lg:py-24">
      <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
        {/* Left: Text Content */}
        <div className="flex flex-col gap-8 flex-1">
          <div className="flex flex-col gap-4 text-left">
            <h1 className="text-4xl font-bold  tracking-wide lg:text-7xl mb-3">
              Nice to meet u, <br /> I am <span className="text-primary">Gaonhae</span>
            </h1>
            <p className="text-muted-foreground mb-10 text-lg lg:text-xl font-normal leading-relaxed max-w-[600px]">
              만나서 반갑습니다. 깊이 있는 사고를 하는 김태양입니다.
              <br />제가 불태운, 불태우는, 불태울 청춘을 이곳에서 보여드리겠습니다.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/projects">
              <Button
                size="lg"
                className="min-w-[160px] h-14 rounded-xl text-base font-bold tracking-wide hover:shadow-lg transition-all"
              >
                run GetProjects()
              </Button>
            </Link>
            <Link href="/blog">
              <Button
                size="lg"
                variant="outline"
                className="min-w-[160px] h-14 rounded-xl text-base font-bold tracking-wide bg-primary/10 text-primary border-0 hover:bg-primary/20 transition-all"
              >
                run GetBlogs()
              </Button>
            </Link>
          </div>
        </div>

        {/* Right: Image */}
        <div className="w-full max-w-[285px] lg:max-w-none lg:flex-[0.75]">
          <div className="aspect-3/4 rounded-[2rem] shadow-2xl overflow-hidden relative border border-primary/20">
            <Image
              src="/profile.jpg"
              alt="김태양 프로필 사진"
              fill
              className="object-cover"
              priority
            />
            {/* <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" /> */}
          </div>
        </div>
      </div>
    </section>
  );
}
