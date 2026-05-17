import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import AOS from 'aos';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

export default function Layout({ children }) {
    const location = useLocation();

    useEffect(() => {
        AOS.refresh();
    }, [location.pathname]);

    const isHome = location.pathname === '/';

    return (
        <div className={`flex flex-col min-h-screen ${!isHome ? 'bg-amber-50' : ''}`}>
            <ScrollToTop />
            <Navbar />
            <main className='flex-1 min-h-screen'>{<Outlet />}</main>
            <Footer />
        </div>
    );
}