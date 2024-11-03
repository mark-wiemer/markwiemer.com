import { ArticleMetadata } from '../utils/articles';
import { articleRoute } from '../utils/routes';
import InternalLink from './InternalLink';

interface IBlogCardProps {
    metadata: ArticleMetadata;
}

const BlogCard: React.FC<IBlogCardProps> = ({ metadata }) => {
    return (
        <>
            <InternalLink
                href={articleRoute(metadata.id)}
                text={metadata.mainHeading}
                style={{ width: 'fit-content' }}
            />
            <p>{metadata.subheading}</p>
        </>
    );
};

export default BlogCard;
