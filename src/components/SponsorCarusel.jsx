
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { supabase } from '../supabaseClient'

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// ── SKELETON ─────────────────────────────────
function SkeletonCard() {
    return (
        <div className="h-[150px] rounded-2xl bg-white border-2 border-[#F0EAF8] animate-pulse flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 w-full px-6">
            <div className="w-16 h-16 rounded-xl bg-[#F0EAF8]" />
            <div className="w-24 h-3 rounded-full bg-[#F0EAF8]" />
        </div>
        </div>
    );
}

// ── SPONSOR CARD ─────────────────────────────
function SponsorCard({ sponsor }) {
    const [imgOk, setImgOk] = useState(true);

    return (
        <a
        href={sponsor.url || '#'}
        target="_blank"
        rel="noopener noreferrer"
        className="
            group flex flex-col items-center justify-center gap-3
            h-[150px] rounded-2xl border-2 border-[#E8E0FF]
            bg-white px-5 py-4
            transition-all duration-300
            hover:-translate-y-1.5
            hover:border-[#FF6B35]
            hover:shadow-[0_12px_32px_rgba(255,107,53,0.15)]
        "
        >
        {sponsor.logo_url && imgOk ? (
            <img
            src={sponsor.logo_url}
            alt={`Logo ${sponsor.nome}`}
            className="max-h-[72px] max-w-[140px] w-auto object-contain
                transition-transform duration-300 group-hover:scale-105"
            onError={() => setImgOk(false)}
            />
        ) : (
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FF6B35]/20 to-[#9B5DE5]/20 flex items-center justify-center text-2xl">
            🏢
            </div>
        )}

        <span className="
            font-['Baloo_2'] font-bold text-[0.9rem] text-[#2D2D2D]
            text-center leading-tight line-clamp-2
            transition-colors duration-200 group-hover:text-[#FF6B35]
        ">
            {sponsor.nome}
        </span>
        </a>
    );
}

// ── MAIN COMPONENT ───────────────────────────
export default function SponsorCarousel() {
    const [sponsors, setSponsors] = useState([]);
    const [loading,  setLoading]  = useState(true);
    const [error,    setError]    = useState(null);

    const load = async () => {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
        .from('sponsors')
        .select('*')
        .eq('attivo', true)
        .order('nome', { ascending: true });

        if (error) setError(error.message);
        else       setSponsors(data);

        setLoading(false);
    };

    useEffect(() => { load(); }, []);

    return (
        <section className="py-20 px-6 overflow-hidden" id="sponsor">
        <div className="max-w-5xl mx-auto">

            {/* Header */}
            <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
            <h2 className="font-['Baloo_2'] font-extrabold text-[clamp(1.8rem,4vw,2.6rem)] text-[#2D2D2D] flex items-center gap-3 leading-tight">
                <span>🤝</span> I nostri sponsor
            </h2>
            {!loading && !error && sponsors.length > 0 && (
                <span className="font-['Nunito'] text-sm text-[#aaa] font-semibold">
                {sponsors.length} partner ci supportano
                </span>
            )}
            </div>

            {/* Loading */}
            {loading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
            )}

            {/* Error */}
            {error && (
            <p className="font-['Nunito'] text-[#888] text-sm text-center py-8">
                Impossibile caricare gli sponsor.{' '}
                <button onClick={load} className="text-[#FF6B35] font-bold hover:underline">
                Riprova →
                </button>
            </p>
            )}

            {/* Empty */}
            {!loading && !error && sponsors.length === 0 && (
            <p className="font-['Nunito'] text-[#888] text-sm text-center py-8">
                Vuoi diventare il primo sponsor?{' '}
                <a href="mailto:info@coloraboom.it" className="text-[#FF6B35] font-bold hover:underline">
                Scrivici →
                </a>
            </p>
            )}

            {/* Carosello */}
            {!loading && !error && sponsors.length > 0 && (
            <div className="relative pt-5">

                <div className="absolute left-0 top-0 bottom-10 w-10 z-10 pointer-events-none bg-gradient-to-r from-[#FFF9F0] to-transparent" />
                <div className="absolute right-0 top-0 bottom-10 w-10 z-10 pointer-events-none bg-gradient-to-l from-[#FFF9F0] to-transparent" />

                <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={16}
                slidesPerView={1.4}
                autoplay={{ delay: 2800, disableOnInteraction: false, pauseOnMouseEnter: true }}
                pagination={{ clickable: true, dynamicBullets: true }}
                navigation={{ nextEl: '.cb-swiper-next', prevEl: '.cb-swiper-prev' }}
                loop={sponsors.length > 4}
                centeredSlides={sponsors.length < 4}
                //loopAdditionalSlides={sponsors.length}
                //onSlideChange={(swiper) => swiper.pagination.update()} 
                breakpoints={{
                    480:  { slidesPerView: 2.3, spaceBetween: 16 },
                    768:  { slidesPerView: 3.2, spaceBetween: 20 },
                    1024: { slidesPerView: 4,   spaceBetween: 24 },
                }}
                className="!pb-10 !pt-5"
                >
                {sponsors.map(sponsor => (
                    <SwiperSlide key={sponsor.id}>
                    <SponsorCard sponsor={sponsor} />
                    </SwiperSlide>
                ))}
                </Swiper>

                <button className="cb-swiper-prev hidden md:flex absolute left-0 top-[calc(50%-20px)] -translate-x-5 z-20 w-10 h-10 rounded-full items-center justify-center bg-white border-2 border-[#E8E0FF] shadow-md text-[#888] font-bold text-xl hover:border-[#FF6B35] hover:text-[#FF6B35] transition-all duration-200 disabled:opacity-30">‹</button>
                <button className="cb-swiper-next hidden md:flex absolute right-0 top-[calc(50%-20px)] translate-x-5 z-20 w-10 h-10 rounded-full items-center justify-center bg-white border-2 border-[#E8E0FF] shadow-md text-[#888] font-bold text-xl hover:border-[#FF6B35] hover:text-[#FF6B35] transition-all duration-200 disabled:opacity-30">›</button>

            </div>
            )}

            {!loading && (
            <p className="text-center mt-4 font-['Nunito'] text-sm text-[#aaa]">
                Vuoi diventare sponsor?{' '}
                <a href="mailto:info@coloraboom.it?subject=Richiesta%20Sponsorizzazione&body=Salve%2C%20vorrei%20informazioni%20per%20diventare%20sponsor%20di%20ColoraBoom!" className="text-[#FF6B35] font-bold hover:underline">
                Contattaci →
                </a>
            </p>
            )}

        </div>

        <style>{`
            .swiper-pagination-bullet        { background: #FFD0BC; opacity: 1; }
            .swiper-pagination-bullet-active { background: #FF6B35 !important; }
        `}</style>

        </section>
    );
}