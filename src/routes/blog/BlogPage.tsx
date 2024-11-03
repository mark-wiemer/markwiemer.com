import { makeStyles } from '@fluentui/react-components';
import useAppStyles from '../../App.styles';
import BlogCard from '../../components/BlogCard';
import { allArticleIds, articleMetadata } from '../../utils/articles';
import InternalLink from '../../components/InternalLink';

const useBlogPageStyles = makeStyles({
    cardWrapper: { display: 'flex', flexDirection: 'column', rowGap: '12px' },
});

const BlogPage: React.FC = () => {
    const appStyles = useAppStyles();
    const blogPageStyles = useBlogPageStyles();
    return (
        <div className={`${appStyles.article} ${blogPageStyles.cardWrapper}`}>
            <InternalLink
                href="/"
                style={{ textAlign: 'center', fontSize: '18px' }}
                text="Home"
            />
            {allArticleIds().map((id) => (
                <BlogCard key={id} metadata={articleMetadata[id]} />
            ))}
        </div>
    );
};

export default BlogPage;
