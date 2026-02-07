import { getProjects } from "@/actions/projects";
import { getAllMDXContent } from "@/lib/mdx/mdx-utils";
import { ProjectGrid } from "@/components/projects/ProjectGrid";

export const metadata = {
  title: "Projects - gaonhae.me",
  description: "진행한 프로젝트들을 소개합니다",
};

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getProjects();
  const projectsMDX = getAllMDXContent("projects");

  // Merge thumbnail from MDX if not set in database, or use placeholder
  const projectsWithThumbnails = projects.map((project) => {
    const mdx = projectsMDX.find((p) => p.slug === project.slug);
    return {
      ...project,
      thumbnail: project.thumbnail || mdx?.frontMatter?.thumbnail || '/images/thumbnailPlaceholder.png',
    };
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">프로젝트 : </h1>
          <p className="text-lg text-muted-foreground">
            [명] 장기간에 걸쳐 지속적으로 노력을 들이고, 그로부터 깨달음을 얻을 수 있었던 모든 경험.
          </p>
        </div>

        <ProjectGrid projects={projectsWithThumbnails} />
      </div>
    </div>
  );
}
