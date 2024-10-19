import useAppStyles from '../../App.styles';
import InternalLink from '../../components/InternalLink';
import { allArticleIds, articleMetadata } from '../../utils/articles';

const BlogPage: React.FC = () => {
    const appStyles = useAppStyles();
    return (
        <div className={appStyles.article}>
            {allArticleIds().map((id) => (
                <InternalLink
                    href={`/blog/${id}`}
                    text={articleMetadata[id].mainHeading}
                    style={{ width: 'fit-content' }}
                />
            ))}
        </div>
    );
};

export default BlogPage;
