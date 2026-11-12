import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

const AUTH_ROUTES = ['/login', '/register'];

function SiteLayout() {
    const { pathname } = useLocation();
    const isAuthPage = AUTH_ROUTES.includes(pathname);

    if (isAuthPage) {
        return (
            <main className="auth-layout">
                <Outlet />
            </main>
        );
    }

    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default SiteLayout;
