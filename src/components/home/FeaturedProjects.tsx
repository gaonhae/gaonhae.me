import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    title: "Life is short",
    description: "부모님의 옛 사진을 통해 부모님의 젊은 시절을 영상으로 볼 수 있는 서비스",
    tech: "처음으로 도전한 사업,",
    image: "/images/projects/lifeisshort_mockup.png",
  },
  {
    title: "24살인데 대학교 1학년?",
    description: "4년을 내내 달고 살던 학벌에 대한 미련. 그리고 끝내 모두 털어내버린 분투의 과정",
    tech: "저도 제가 이렇게까지 버틸 수 있을 줄 몰랐죠",
    image: "/images/projects/certification.jpg",
  },
  {
    title: "TOEIC 3주, 930점",
    description: "갑작스러운 끌림에 도전했던 토익. 이렇게 잘 나올 줄 알았으면 진작 할 걸",
    tech: "언어 시험에는 다소 강한 편",
    image: "/images/projects/toeic.png",
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
              <div className="w-full aspect-[4/3] relative overflow-hidden bg-muted">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6 flex flex-col gap-2">
                <p className="text-muted-foreground text-xs font-bold uppercase tracking-wider">
                  {project.tech}
                </p>
                <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
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
