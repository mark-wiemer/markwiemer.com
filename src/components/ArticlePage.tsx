import { Link } from '@fluentui/react-components';
import { useNavigate } from 'react-router-dom';
import useAppStyles from '../App.styles';

interface ArticleProps {
    article: React.ReactNode;
}

/** Wraps the provided article with appropriate styles and a link home */
const ArticlePage: React.FC<ArticleProps> = ({ article }): JSX.Element => {
    const appStyles = useAppStyles();

    const navigate = useNavigate();
    return (
        <div className={appStyles.article}>
            <Link
                as="a"
                onClick={() => {
                    navigate('/');
                }}
                style={{ textAlign: 'center', fontSize: '18px' }}
            >
                Home
            </Link>
            {article}
        </div>
    );
};

export default ArticlePage;
