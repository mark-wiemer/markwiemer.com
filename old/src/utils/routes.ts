import { ArticleId } from './articles';
import { Href } from './types';

export function articleRoute(articleId: ArticleId): Href {
    return `/blog/${articleId}`;
}
