import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog');

  const latestPosts = posts
    .sort(
      (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
    )
    .slice(0, 20);

  return rss({
    title: '無趣味の戯言',
    description: '無趣味なりにつらつらと戯言を。フロントエンドと車にちょっぴり興味あり。',
    site: context.site ?? 'https://blog.udcxx.me/',
    items: latestPosts.map((post) => {
      const cleanSlug = post.id.replace(/\.[^/.]+$/, '');

      return {
        title: post.data.title,
        description: post.data.description ?? '',
        pubDate: post.data.date,
        link: `/article/${cleanSlug}/`,
      };
    }),
  });
}