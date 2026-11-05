import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.coerce.string(),
    description: z.string().optional().nullable(),
    date: z.coerce.date(),
    eyecatch: z.string().optional().nullable(),
    eyecatchEmoji: z.string().optional().nullable(),
    tags: z.preprocess((tags) => {
      // カンマ区切りのタグを配列に変えるプリプロセス
      if (typeof tags === 'string') {
        return tags.split(' ').map((tag) => tag.trim()).filter(Boolean);
      }
      if (Array.isArray(tags)) { return tags; }

      return [];
    }, z.array(z.string())),
  }),
});

export const collections = { blog };
