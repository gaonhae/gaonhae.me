import { getProjects } from "@/actions/projects";
import { ProjectGrid } from "@/components/projects/ProjectGrid";

export const metadata = {
  title: "Projects - gaonhae.me",
  description: "진행한 프로젝트들을 소개합니다",
};

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">프로젝트</h1>
          <p className="text-lg text-muted-foreground">
            기획부터 개발, 운영까지 직접 경험한 프로젝트들입니다
          </p>
        </div>

        <ProjectGrid projects={projects} />
      </div>
    </div>
  );
}
