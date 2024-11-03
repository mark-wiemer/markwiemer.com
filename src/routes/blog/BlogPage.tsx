import useAppStyles from '../../App.styles';
import BlogCard from '../../components/BlogCard';
import { allArticleIds, articleMetadata } from '../../utils/articles';

const BlogPage: React.FC = () => {
    const appStyles = useAppStyles();
    return (
        <div className={appStyles.article}>
            {allArticleIds().map((id) => (
                <BlogCard key={id} metadata={articleMetadata[id]} />
            ))}
        </div>
    );
};

export default BlogPage;
