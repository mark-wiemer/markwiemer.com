import useAppStyles from '../App.styles';
import InternalLink from './InternalLink';
import ErrorPage from './ErrorPage';
import { useParams } from 'react-router-dom';
import { ArticleId, articlesById } from '../utils/articles';

type ArticleProps = {
    /**
     * Optional article ID.
     * If not provided, will look for href ID
     * If neither is found, renders error page
     */
    id?: ArticleId;
};
/**
 * Wraps the provided article with appropriate styles and a link home.
 * If no article ID provided, uses the `id` param as an article ID.
 * If no article is found, wraps ErrorPage.
 */
const ArticlePage: React.FC<ArticleProps> = ({ id }): JSX.Element => {
    const appStyles = useAppStyles();
    const { id: hrefId } = useParams();
    const article: React.FC | undefined =
        articlesById[id ?? (hrefId as ArticleId) ?? ArticleId.NotFound];
    return (
        <div className={appStyles.article}>
            <InternalLink
                href="/"
                style={{ textAlign: 'center', fontSize: '18px' }}
                text="Home"
            />
            {article?.({}) ?? <ErrorPage />}
        </div>
    );
};

export default ArticlePage;
