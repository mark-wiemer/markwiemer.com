import {
    createDarkTheme,
    createLightTheme,
    FluentProvider,
} from '@fluentui/react-components';
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import About from './routes/blog/2023-04-17-who-am-i.mdx';
import Breakout from './routes/games/breakout/Breakout';
import HomePage from './routes/home/HomePage';
import { StrictMode, useEffect, useMemo, useState } from 'react';
import useAppStyles, {
    brandDarkThemeColors,
    brandThemeCustomizations,
    brandLightThemeColors,
    brandVariants,
} from './App.styles';
import ArticlePage from './components/ArticlePage';
import BlogPage from './routes/blog/BlogPage';
import { articleRoute } from './utils/routes';
import { ArticleId } from './utils/articles';

const App = () => {
    const styles = useAppStyles();
    const [useDarkTheme, setUseDarkTheme] = useState(
        window.matchMedia('(prefers-color-scheme: dark)').matches,
    );
    const darkTheme = useMemo(
        () => ({
            ...createDarkTheme(brandVariants),
            ...brandDarkThemeColors,
            ...brandThemeCustomizations,
        }),
        [],
    );
    const lightTheme = useMemo(
        () => ({
            ...createLightTheme(brandVariants),
            ...brandLightThemeColors,
            ...brandThemeCustomizations,
        }),
        [],
    );

    useEffect(() => {
        document.body.style.backgroundColor = useDarkTheme
            ? '#1f1f1f'
            : '#ffffff';
    }, [useDarkTheme]);

    // Run on mount only: listen for color scheme preference changes
    useEffect(() => {
        const prefersDarkMode = window.matchMedia(
            '(prefers-color-scheme: dark)',
        );
        prefersDarkMode.addEventListener('change', (e) => {
            if (e.matches) setUseDarkTheme(true);
            else setUseDarkTheme(false);
        });
        return () => {
            prefersDarkMode.removeEventListener('change', () => {
                /* no-op */
            });
        };
    }, []);

    const router = createBrowserRouter(
        [
            { path: '/', element: <HomePage /> },
            //* All paths will always be preserved :)
            {
                path: '/about',
                element: <Navigate to={articleRoute(ArticleId.About)} />,
            },
            { path: '/about/secret', element: <About /> },
            { path: '/blog', element: <BlogPage /> },
            {
                path: '/blog/:id',
                element: <ArticlePage />,
            },
            { path: '/games/breakout', element: <Breakout /> },
        ].map((i) => ({ ...i, errorElement: <ErrorPage /> })),
    );

    return (
        <StrictMode>
            <FluentProvider
                theme={useDarkTheme ? darkTheme : lightTheme}
                className={styles.provider}
            >
                <RouterProvider router={router} />
            </FluentProvider>
        </StrictMode>
    );
};

export default App;
