import { getProjects } from "@/actions/projects";
import { getAllMDXContent } from "@/lib/mdx/mdx-utils";
import { PostCard } from "@/components/blog/PostCard";
import { ProjectCard } from "@/components/projects/ProjectCard";

export async function RecentActivity() {
  // Get recent blog posts (MDX)
  const allPosts = getAllMDXContent("blog").filter((p) => p.frontMatter.published);
  const recentPosts = allPosts.slice(0, 2);

  // Get recent project
  const projects = await getProjects();
  const recentProject = projects[0];

  return (
    <section className="container mx-auto px-4 py-12 border-t border-border">
      <h2 className="text-3xl font-bold mb-8">최근 활동</h2>

      <div className="grid gap-8">
        {/* Recent Blog Posts */}
        <div>
          <h3 className="text-xl font-semibold mb-4">최근 블로그 포스트</h3>
          {recentPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {recentPosts.map((post) => (
                <PostCard
                  key={post.slug}
                  slug={post.slug}
                  frontMatter={post.frontMatter}
                />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">아직 작성된 포스트가 없습니다.</p>
          )}
        </div>

        {/* Recent Project */}
        <div>
          <h3 className="text-xl font-semibold mb-4">최근 프로젝트</h3>
          {recentProject ? (
            <div className="max-w-md">
              <ProjectCard project={recentProject} />
            </div>
          ) : (
            <p className="text-muted-foreground">아직 등록된 프로젝트가 없습니다.</p>
          )}
        </div>
      </div>
    </section>
  );
}
