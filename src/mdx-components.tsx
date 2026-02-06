import type { MDXComponents } from "mdx/types";
import { mdxComponents as customMDXComponents } from "@/lib/mdx/mdx-components";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...customMDXComponents,
    ...components,
  };
}
