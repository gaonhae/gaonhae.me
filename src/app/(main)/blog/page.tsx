import { getAllMDXContent } from "@/lib/mdx/mdx-utils";
import { PostCard } from "@/components/blog/PostCard";

export const metadata = {
  title: "Blog - gaonhae.me",
  description: "기술, 제품, 그리고 삶에 대한 이야기",
};

export const dynamic = "force-dynamic";

export default function BlogPage() {
  const posts = getAllMDXContent("blog").filter((post) => post.frontMatter.published);

  const categories = ["All", "Dev", "Product", "Life"];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">블로그</h1>
          <p className="text-lg text-muted-foreground">
            개발, 기획, 그리고 성장에 대한 생각들을 기록합니다
          </p>
        </div>

        {/* Category Filter - Will be enhanced later with client component */}
        <div className="flex gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                category === "All"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">아직 작성된 포스트가 없습니다.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
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
