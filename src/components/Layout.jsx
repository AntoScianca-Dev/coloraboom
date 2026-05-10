import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import AOS from 'aos';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
    const location = useLocation();

    

    useEffect(() => {
        AOS.refresh();
    }, [location.pathname]);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main>{<Outlet />}</main>
            <Footer />
        </div>
    );
}