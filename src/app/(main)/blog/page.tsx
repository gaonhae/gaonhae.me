import { getAllMDXContent, getMDXContentByCategory } from "@/lib/mdx/mdx-utils";
import { PostCard } from "@/components/blog/PostCard";
import { CategoryFilter } from "@/components/blog/CategoryFilter";

export const metadata = {
  title: "Blog - gaonhae.me",
  description: "기술, 제품, 그리고 삶에 대한 이야기",
};

export const dynamic = "force-dynamic";

interface BlogPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const category = params?.category;

  let posts;
  if (category && category !== "All") {
    posts = getMDXContentByCategory("blog", category);
  } else {
    posts = getAllMDXContent("blog");
  }

  const filteredPosts = posts.filter((post) => post.frontMatter.published);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">블로그 : </h1>
          <p className="text-lg text-muted-foreground">
            [명] 진지하게, 또 정성스럽게 써 내려간 생각들
          </p>
        </div>

        <CategoryFilter />

        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {category && category !== "All"
                ? `"${category}" 카테고리에 포스트가 없습니다.`
                : "아직 작성된 포스트가 없습니다."}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <PostCard
                key={post.slug}
                slug={post.slug}
                frontMatter={post.frontMatter}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
