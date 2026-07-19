import { defineConfig, s } from "velite";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";

export default defineConfig({
  collections: {
    notes: {
      name: "Note",
      pattern: "notes/**/*.mdx",
      schema: s
        .object({
          title: s.string(),
          description: s.string(),
          date: s.isodate(),
          project: s.string(),
          tags: s.array(s.string()),
          series: s.string().optional(),
          part: s.number().optional(),
          code: s.mdx(),
        })
        .transform((data) => ({
          ...data,
          slug: data.project,
        })),
    },
  },
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, { theme: "dark-plus", keepBackground: true }],
    ],
  },
});
