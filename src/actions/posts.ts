"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { Post, Inserts, Updates } from "@/types";

export async function getPosts() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
    return [];
  }

  return data as Post[];
}

export async function getPostBySlug(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error) {
    console.error("Error fetching post:", error);
    return null;
  }

  return data as Post;
}

export async function getPostsByCategory(category: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("category", category)
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts by category:", error);
    return [];
  }

  return data as Post[];
}

export async function createPost(post: Inserts<"posts">) {
  const supabase = await createClient();

  const { data, error } = await supabase.from("posts").insert(post).select().single();

  if (error) {
    console.error("Error creating post:", error);
    throw new Error(error.message);
  }

  revalidatePath("/blog");
  return data as Post;
}

export async function updatePost(id: string, updates: Updates<"posts">) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating post:", error);
    throw new Error(error.message);
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${data.slug}`);
  return data as Post;
}

export async function deletePost(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    console.error("Error deleting post:", error);
    throw new Error(error.message);
  }

  revalidatePath("/blog");
}
