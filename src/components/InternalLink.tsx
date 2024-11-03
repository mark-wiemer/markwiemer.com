import { Link } from '@fluentui/react-components';
import { Href } from '../utils/types';

interface InternalLinkProps {
    text: string;
    href: Href;
    style?: React.CSSProperties;
}

const InternalLink: React.FC<InternalLinkProps> = ({ text, href, style }) => {
    return (
        <Link as="a" href={href} style={style}>
            {text}
        </Link>
    );
};

export default InternalLink;
