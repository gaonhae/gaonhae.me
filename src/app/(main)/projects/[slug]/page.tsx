import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/actions/projects";
import { getMDXContent, getAllMDXContent } from "@/lib/mdx/mdx-utils";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/lib/mdx/mdx-components";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  // Use MDX files for static generation instead of database
  const mdxProjects = getAllMDXContent("projects");
  return mdxProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.name} - gaonhae.me`,
    description: project.description || project.name,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Try to get MDX content for the project
  const mdxContent = getMDXContent("projects", slug);

  return (
    <article className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Link href="/projects">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            프로젝트 목록으로
          </Button>
        </Link>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.name}</h1>

          {project.description && (
            <p className="text-xl text-muted-foreground mb-6">{project.description}</p>
          )}

          {project.tech_stack && project.tech_stack.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech_stack.map((tech) => (
                <span
                  key={tech}
                  className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          <div className="flex gap-4">
            {project.github_url && (
              <Link href={project.github_url} target="_blank" rel="noopener noreferrer">
                <Button variant="outline">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </Button>
              </Link>
            )}
            {project.live_url && (
              <Link href={project.live_url} target="_blank" rel="noopener noreferrer">
                <Button variant="default">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Live Demo
                </Button>
              </Link>
            )}
          </div>
        </header>

        {mdxContent && (
          <div className="mdx-content prose prose-lg dark:prose-invert max-w-none">
            <MDXRemote
              source={mdxContent.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm, remarkMath],
                  rehypePlugins: [rehypeHighlight, rehypeKatex],
                },
              }}
            />
          </div>
        )}

        {!mdxContent && (
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-muted-foreground">프로젝트 상세 정보가 준비 중입니다.</p>
          </div>
        )}
      </div>
    </article>
  );
}
