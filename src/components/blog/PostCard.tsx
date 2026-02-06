import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Tag } from "lucide-react";
import { format } from "date-fns";
import type { FrontMatter } from "@/lib/mdx/mdx-utils";

interface PostCardProps {
  slug: string;
  frontMatter: FrontMatter;
}

export function PostCard({ slug, frontMatter }: PostCardProps) {
  const { title, date, description, category, tags } = frontMatter;

  const categoryColors: Record<string, string> = {
    Dev: "bg-blue-500/10 text-blue-500",
    Product: "bg-purple-500/10 text-purple-500",
    Life: "bg-green-500/10 text-green-500",
  };

  const categoryColor = category
    ? categoryColors[category] || "bg-gray-500/10 text-gray-500"
    : "bg-gray-500/10 text-gray-500";

  return (
    <Link href={`/blog/${slug}`}>
      <Card className="h-full transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            {category && (
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${categoryColor}`}>
                {category}
              </span>
            )}
            {date && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-3 w-3 mr-1" />
                {format(new Date(date), "yyyy-MM-dd")}
              </div>
            )}
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
          {description && (
            <CardDescription className="line-clamp-2">{description}</CardDescription>
          )}
        </CardHeader>
        {tags && tags.length > 0 && (
          <CardContent>
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="h-3 w-3 text-muted-foreground" />
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    </Link>
  );
}
