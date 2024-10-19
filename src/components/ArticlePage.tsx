import useAppStyles from '../App.styles';
import InternalLink from './InternalLink';

interface ArticleProps {
    article: React.ReactNode;
}

/** Wraps the provided article with appropriate styles and a link home */
const ArticlePage: React.FC<ArticleProps> = ({ article }): JSX.Element => {
    const appStyles = useAppStyles();
    return (
        <div className={appStyles.article}>
            <InternalLink
                href="/"
                style={{ textAlign: 'center', fontSize: '18px' }}
                text="Home"
            />
            {article}
        </div>
    );
};

export default ArticlePage;
