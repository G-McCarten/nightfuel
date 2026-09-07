import type { MDXComponents } from "mdx/types";

/**
 * MDX is only used for the legal pages. Typography comes from the
 * `.legal-prose` class in globals.css, so there's nothing to override
 * per-element here.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components };
}
