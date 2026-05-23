import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const links = [
    { label: "Home",  href: '/'    },
    { label: 'Info',  href: '/info'  },
    { label: 'Sponsor',   href: '/sponsor'   },
    { label: 'Contatti',   href: '/contatti'   },
];

export default function Navbar() {
    const [scrolled,     setScrolled]     = useState(false);
    const [menuOpen,     setMenuOpen]     = useState(false);
    const [activeAnchor, setActiveAnchor] = useState('');
    const location = useLocation();

    // Rileva scroll per effetto glassmorphism
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Chiudi menu mobile al cambio pagina
    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    // Smooth scroll verso ancore della home
    const handleAnchorClick = (e, href) => {
        if (href.startsWith('/#')) {
        e.preventDefault();
        const id = href.slice(2);
        setActiveAnchor(id);
        setMenuOpen(false);

        if (location.pathname !== '/') {
            // Naviga alla home e poi scrolla
            window.location.href = href;
        } else {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }
        }
    };

    return (
        <>
            <header
                className={`
                fixed top-0 left-0 right-0 z-50
                transition-all duration-300
                ${scrolled
                    ? 'bg-[#FFF9F0]/90 backdrop-blur-xl shadow-[0_2px_20px_rgba(255,107,53,0.1)] border-b border-orange-100'
                    : 'bg-transparent'
                }
                `}
            >
                <nav className="max-w-5xl mx-auto px-6 h-[68px] flex items-center justify-between">

                    {/* ── LOGO ── */}
                    <NavLink
                        to="/"
                        className="flex items-center gap-2 group select-none tracking-tight"
                        aria-label="ColoraBoom home"
                    >
                        <span className="text-2xl transition-transform duration-300 group-hover:rotate-12">🎨</span>
                        <span
                        className="font-extrabold text-[1.55rem] leading-none tracking-tight text-orange-500"
                        style={{ letterSpacing: '-0.04em' }}
                        >
                        Colora
                            <span className="text-pink-500 transition-colors duration-200">
                                Boom
                            </span>
                            <span className="text-gray-600">!</span>
                        </span>
                    </NavLink>

                    {/* ── DESKTOP LINKS ── */}
                    <div className="hidden md:flex items-center gap-1">
                        {links.map(({ label, href }) => (
                            <NavLink
                                to={href}
                                className={({ isActive }) => `
                                    font-bold text-[0.88rem] tracking-wide
                                    px-4 py-2 rounded-full transition-all duration-200
                                    ${isActive
                                    ? 'bg-orange-50 text-[#FF6B35]'
                                    : 'text-[#888] hover:bg-orange-50 hover:text-[#FF6B35]'
                                    }
                                `}
                                >
                                {label}
                            </NavLink>
                        ))}

                        {/* CTA */}
                        <a
                        href="/register"
                        onClick={(e) => handleAnchorClick(e, '/register')}
                        className="
                            ml-2 font-extrabold text-[0.88rem]
                            text-white px-5 py-[9px] rounded-full
                            bg-gradient-to-r from-[#FF6B35] to-[#FF4D8D]
                            shadow-[0_4px_16px_rgba(255,107,53,0.35)]
                            hover:shadow-[0_8px_24px_rgba(255,107,53,0.45)]
                            hover:-translate-y-0.5
                            transition-all duration-200
                            whitespace-nowrap
                        "
                        >
                            <span className="flex">
                                <FontAwesomeIcon icon={faPen} className="text-xl pr-3" />
                                Iscriviti
                            </span>
                        </a>
                    </div>

                    {/* ── HAMBURGER (mobile) ── */}
                    <button
                        className="md:hidden flex flex-col gap-[5px] p-2 rounded-xl hover:bg-orange-50 transition-colors"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
                        aria-expanded={menuOpen}
                    >
                        <span className={`
                        block w-5 h-0.5 bg-[#2D2D2D] rounded-full origin-center
                        transition-all duration-300
                        ${menuOpen ? 'translate-y-[6.5px] rotate-45' : ''}
                        `}/>
                        <span className={`
                        block w-5 h-0.5 bg-[#2D2D2D] rounded-full
                        transition-all duration-300
                        ${menuOpen ? 'opacity-0 scale-x-0' : ''}
                        `}/>
                        <span className={`
                        block w-5 h-0.5 bg-[#2D2D2D] rounded-full origin-center
                        transition-all duration-300
                        ${menuOpen ? '-translate-y-[6.5px] -rotate-45' : ''}
                        `}/>
                    </button>

                </nav>

                {/* ── MOBILE MENU ── */}
                <div className={`
                md:hidden overflow-hidden
                transition-all duration-300 ease-in-out
                ${menuOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'}
                bg-[#FFF9F0]/95 backdrop-blur-xl
                border-t border-orange-100
                `}>
                    <div className="px-6 py-4 flex flex-col gap-1">
                        {links.map(({ label, href }) => (
                        <a
                            key={href}
                            href={href}
                            onClick={(e) => handleAnchorClick(e, href)}
                            className="
                            font-['Nunito'] font-bold text-[0.95rem]
                            text-[#666] px-4 py-3 rounded-2xl
                            hover:bg-orange-50 hover:text-[#FF6B35]
                            transition-all duration-200
                            "
                        >
                            {label}
                        </a>
                        ))}
                        <a
                        href="/register"
                        onClick={(e) => handleAnchorClick(e, '/register')}
                        className="
                            mt-2 font-['Nunito'] font-extrabold text-[0.95rem]
                            text-white text-center px-5 py-3 rounded-2xl
                            bg-gradient-to-r from-[#FF6B35] to-[#FF4D8D]
                            shadow-[0_4px_16px_rgba(255,107,53,0.3)]
                            transition-all duration-200
                        "
                        >
                        Iscriviti ora 🚀
                        </a>
                    </div>
                </div>

            </header>

            {/* Spacer per compensare la navbar fixed */}
            <div className="h-[68px]" />
        </>
    );
}