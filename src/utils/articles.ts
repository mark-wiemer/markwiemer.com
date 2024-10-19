import ErrorPage from '../components/ErrorPage';
import About from '../routes/about/About.mdx';

export enum ArticleId {
    About = 'about',
    NotFound = 'notFound',
}

export const articlesById: Record<ArticleId, React.FC> = {
    [ArticleId.About]: About,
    [ArticleId.NotFound]: ErrorPage,
};
