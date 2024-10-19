import ErrorPage from '../components/ErrorPage';
import About from '../routes/blog/2023-04-17-who-am-i.mdx';

export enum ArticleId {
    About = 'about',
    NotFound = 'notFound',
}

export const articlesById: Record<ArticleId, React.FC> = {
    [ArticleId.About]: About,
    [ArticleId.NotFound]: ErrorPage,
};
