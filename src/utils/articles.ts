import ErrorPage from '../components/ErrorPage';
import About from '../routes/blog/2023-04-17-who-am-i.mdx';
import MonthsWithoutMusic from '../routes/blog/2024-10-08-months-without-music.mdx';

export enum ArticleId {
    About = 'about',
    MonthsWithoutMusic = 'months-without-music',
    NotFound = 'notFound',
}

export const articlesById: Record<ArticleId, React.FC> = {
    [ArticleId.About]: About,
    [ArticleId.MonthsWithoutMusic]: MonthsWithoutMusic,
    [ArticleId.NotFound]: ErrorPage,
};
