import ErrorPage from '../components/ErrorPage';
import About from '../routes/blog/2023-04-17-who-am-i.mdx';
import MonthsWithoutMusic from '../routes/blog/2024-10-08-months-without-music.mdx';

/**
 * These article IDs also serve as the URL
 * e.g. https://markwiemer.com/blog/months-without-music
 */
export enum ArticleId {
    About = 'about',
    MonthsWithoutMusic = 'months-without-music',
    NotFound = 'notFound',
}

export const articlesById: Record<ArticleId, React.FC> = {
    [ArticleId.About]: About,
    [ArticleId.MonthsWithoutMusic]: MonthsWithoutMusic,
    [ArticleId.NotFound]: ErrorPage,
};

interface ArticleMetadata {
    // todo To be displayed in the browser tab
    pageTitle: string;
    mainHeading: string;
    subheading: string;
}

export const articleMetadata: Record<ArticleId, ArticleMetadata> = {
    [ArticleId.About]: {
        pageTitle: 'About',
        mainHeading: 'Who am I anyway? A 5-minute autobiography',
        subheading:
            'In which your author divulges too much (and also not enough) personal information in the hopes of better connecting with you, his audience',
    },
    [ArticleId.MonthsWithoutMusic]: {
        pageTitle: 'Months without music',
        mainHeading: 'Months without music: a divorce story',
        subheading: '',
    },
    [ArticleId.NotFound]: {
        pageTitle: 'Not found',
        mainHeading: '404',
        subheading: `We couldn't find that article :(`,
    },
};

export const allArticleIds = (): ArticleId[] => {
    return Object.values(ArticleId).filter(
        (value) => value !== ArticleId.NotFound,
    );
};
