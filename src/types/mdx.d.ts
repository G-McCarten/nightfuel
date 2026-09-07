/**
 * `@types/mdx` declares only the default export for `*.mdx`. The legal
 * documents also export their own revision date, so the module declaration is
 * merged here rather than duplicated.
 */
declare module "*.mdx" {
  export const lastUpdated: string;
}
