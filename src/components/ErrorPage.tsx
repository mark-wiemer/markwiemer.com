import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>
                    {/* @ts-expect-error property access on `unknown` object */}
                    {error?.statusText ||
                        // @ts-expect-error property access on `unknown` object
                        error?.message ||
                        'Failed to extract error details.'}
                </i>
            </p>
        </div>
    );
}
