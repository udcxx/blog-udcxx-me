import { serverQueryContent } from '#content/server';
import { Feed } from 'feed'

export default defineEventHandler(async (event) => {
    const feed = new Feed({
        title: '無趣味の戯言',
        description: '無趣味なりにつらつらと戯言を。フロントエンドと車にちょっぴり興味あり。',
        id: 'https://blog.udcxx.me/',
        link: 'https://blog.udcxx.me/',
        language: 'ja',
        image: 'https://blog.udcxx.me/images/blog-card.png',
        copyright: 'udcxx',
    });

    const articleNew = await serverQueryContent(event)
        .sort({ date: -1 })
        .limit(10)
        .find();

    articleNew.forEach((article) => {
        feed.addItem({
            link: article._path + '/',
            date: new Date(article.date),
            content: generateContentFromAst(article.body.children),
            title: article.title,
        });
    });

    // RSS 2.0 形式で出力する
    return feed.rss2()
})