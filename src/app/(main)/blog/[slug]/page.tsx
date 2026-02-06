import { notFound } from "next/navigation";
import { getMDXContent, getAllMDXContent } from "@/lib/mdx/mdx-utils";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/lib/mdx/mdx-components";
import { Calendar, ArrowLeft, Tag } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const posts = getAllMDXContent("blog");
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getMDXContent("blog", slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.frontMatter.title} - gaonhae.me`,
    description: post.frontMatter.description || post.frontMatter.title,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getMDXContent("blog", slug);

  if (!post) {
    notFound();
  }

  const { frontMatter, content } = post;

  const categoryColors: Record<string, string> = {
    Dev: "bg-blue-500/10 text-blue-500",
    Product: "bg-purple-500/10 text-purple-500",
    Life: "bg-green-500/10 text-green-500",
  };

  const categoryColor = frontMatter.category
    ? categoryColors[frontMatter.category] || "bg-gray-500/10 text-gray-500"
    : "bg-gray-500/10 text-gray-500";

  return (
    <article className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Link href="/blog">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            블로그로 돌아가기
          </Button>
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            {frontMatter.category && (
              <span className={`text-sm font-semibold px-3 py-1 rounded-full ${categoryColor}`}>
                {frontMatter.category}
              </span>
            )}
            {frontMatter.date && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                {format(new Date(frontMatter.date), "yyyy-MM-dd")}
              </div>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {frontMatter.title}
          </h1>

          {frontMatter.description && (
            <p className="text-xl text-muted-foreground mb-6">
              {frontMatter.description}
            </p>
          )}

          {frontMatter.tags && frontMatter.tags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="h-4 w-4 text-muted-foreground" />
              {frontMatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="mdx-content prose prose-lg dark:prose-invert max-w-none">
          <MDXRemote
            source={content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm, remarkMath],
                rehypePlugins: [rehypeHighlight, rehypeKatex],
              },
            }}
          />
        </div>
      </div>
    </article>
  );
}
