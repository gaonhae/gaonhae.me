import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

export interface FrontMatter {
  title: string;
  date: string;
  description?: string;
  category?: string;
  tags?: string[];
  published?: boolean;
  thumbnail?: string;
  tech_stack?: string[];
  github_url?: string;
  live_url?: string;
}

export interface MDXContent {
  slug: string;
  frontMatter: FrontMatter;
  content: string;
}

export function getMDXFiles(type: "blog" | "projects"): string[] {
  const dir = path.join(contentDirectory, type);

  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs.readdirSync(dir).filter((file) => file.endsWith(".mdx"));
}

export function getMDXContent(
  type: "blog" | "projects",
  slug: string
): MDXContent | null {
  try {
    const filePath = path.join(contentDirectory, type, `${slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      frontMatter: data as FrontMatter,
      content,
    };
  } catch (error) {
    console.error(`Error reading MDX file: ${slug}`, error);
    return null;
  }
}

export function getAllMDXContent(type: "blog" | "projects"): MDXContent[] {
  const files = getMDXFiles(type);

  const content = files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      return getMDXContent(type, slug);
    })
    .filter((item): item is MDXContent => item !== null)
    .sort((a, b) => {
      if (a.frontMatter.date && b.frontMatter.date) {
        return new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime();
      }
      return 0;
    });

  return content;
}

export function getMDXContentByCategory(
  type: "blog" | "projects",
  category: string
): MDXContent[] {
  const allContent = getAllMDXContent(type);
  return allContent.filter(
    (item) => item.frontMatter.category?.toLowerCase() === category.toLowerCase()
  );
}
