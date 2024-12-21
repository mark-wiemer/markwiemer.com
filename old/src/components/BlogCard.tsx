import { ArticleMetadata } from '../utils/articles';
import { articleRoute } from '../utils/routes';
import InternalLink from './InternalLink';

interface IBlogCardProps {
    metadata: ArticleMetadata;
}

const BlogCard: React.FC<IBlogCardProps> = ({ metadata }) => {
    return (
        <div
            style={{ border: '1px solid', borderRadius: '4px', padding: '4px' }}
        >
            <InternalLink
                href={articleRoute(metadata.id)}
                text={metadata.mainHeading}
                style={{ width: 'fit-content' }}
            />
            {metadata.subheading && <p>{metadata.subheading}</p>}
        </div>
    );
};

export default BlogCard;
