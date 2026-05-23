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

    return (
        <div >
            {/* BLOBS */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute w-[400px] h-[400px] bg-yellow-300 opacity-20 blur-3xl rounded-full  top-[-100px] left-[-100px]" />
                <div className="absolute w-[300px] h-[300px] bg-pink-400 opacity-20 blur-3xl rounded-full  top-[30%] right-[-80px]" />
                <div className="absolute w-[250px] h-[250px] bg-teal-400 opacity-20 blur-3xl rounded-full  bottom-[10%] left-[20%]" />
            </div>
            <ScrollToTop />
            <Navbar />
            <main className='flex-1 min-h-screen'>{<Outlet />}</main>
            <Footer />
        </div>
    );
}