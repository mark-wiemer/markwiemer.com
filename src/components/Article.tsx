import { Link } from '@fluentui/react-components';
import { useNavigate } from 'react-router-dom';
import useAppStyles from '../App.styles';

interface ArticleProps {
    children: React.ReactNode;
}

const Article: React.FC<ArticleProps> = ({ children }): JSX.Element => {
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
            {children}
        </div>
    );
};

export default Article;
