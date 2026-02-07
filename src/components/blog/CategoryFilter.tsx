"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "All";

  const categories = ["All", "Dev", "Product", "Life"];

  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams(searchParams);

    if (category === "All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }

    router.push(`/blog?${params.toString()}`);
  };

  return (
    <div className="flex gap-2 mb-8">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            currentCategory === category
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
