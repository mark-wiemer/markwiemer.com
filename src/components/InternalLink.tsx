import { Link } from '@fluentui/react-components';
import { Href } from '../utils/types';
import { useNavigate } from 'react-router-dom';

interface InternalLinkProps {
    text: string;
    href: Href;
    style?: React.CSSProperties;
}

const InternalLink: React.FC<InternalLinkProps> = ({ text, href, style }) => {
    const navigate = useNavigate();
    return (
        <Link
            as="a"
            onClick={() => {
                navigate(href);
            }}
            style={style}
        >
            {text}
        </Link>
    );
};

export default InternalLink;
