import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="page not-found-page">
            <div className="not-found-content">
                <div className="not-found-code">404</div>
                <h1>Page not found</h1>
                <p>
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link to="/" className="btn btn-primary btn-lg">
                    Back to home
                </Link>
            </div>
        </div>
    );
}

export default NotFound;
