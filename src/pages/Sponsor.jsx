import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshakeAlt, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

// ── TIER CONFIG ───────────────────────────────
const TIER_CONFIG = {
    gold: {
        label:      'Gold Sponsor',
        border:     'border-[#FFD93D]',
        badge:      'bg-[#FFD93D]/20 text-[#b07d00]',
        glow:       'hover:shadow-[0_16px_40px_rgba(255,217,61,0.3)]',
        headerBg:   'bg-gradient-to-r from-[#FFD93D]/10 to-[#FF6B35]/10',
        headerText: 'text-[#b07d00]',
        divider:    'from-[#FFD93D]/0 via-[#FFD93D]/40 to-[#FFD93D]/0',
        cardSize:   'h-[250px]',
        logoSize:   'max-h-[200px]',
    },
    silver: {
        label:      'Silver Sponsor',
        border:     'border-[#C0C0C0]',
        badge:      'bg-[#C0C0C0]/20 text-[#666]',
        glow:       'hover:shadow-[0_16px_40px_rgba(192,192,192,0.3)]',
        headerBg:   'bg-gradient-to-r from-[#C0C0C0]/10 to-[#9B5DE5]/10',
        headerText: 'text-[#666]',
        divider:    'from-[#C0C0C0]/0 via-[#C0C0C0]/40 to-[#C0C0C0]/0',
        cardSize:   'h-[180px]',
        logoSize:   'max-h-[75px]',
    },
    bronze: {
        label:      'Bronze Sponsor',
        border:     'border-[#E8E0FF]',
        badge:      'bg-[#9B5DE5]/10 text-[#9B5DE5]',
        glow:       'hover:shadow-[0_16px_40px_rgba(155,93,229,0.2)]',
        headerBg:   'bg-gradient-to-r from-[#9B5DE5]/10 to-[#4A90D9]/10',
        headerText: 'text-[#9B5DE5]',
        divider:    'from-[#9B5DE5]/0 via-[#9B5DE5]/30 to-[#9B5DE5]/0',
        cardSize:   'h-[160px]',
        logoSize:   'max-h-[60px]',
    },
    };

    // ── SKELETON ─────────────────────────────────
    function SkeletonCard({ size = 'h-[180px]' }) {
    return (
        <div className={`${size} rounded-2xl bg-white border-2 border-[#F0EAF8] animate-pulse flex items-center justify-center`}>
        <div className="flex flex-col items-center gap-3 w-full px-6">
            <div className="w-16 h-16 rounded-xl bg-[#F0EAF8]" />
            <div className="w-24 h-3 rounded-full bg-[#F0EAF8]" />
            <div className="w-32 h-2 rounded-full bg-[#F0EAF8]" />
        </div>
        </div>
    );
    }

    // ── SPONSOR CARD ─────────────────────────────
    function SponsorCard({ sponsor, tier }) {
    const [imgOk, setImgOk] = useState(true);
    const cfg = TIER_CONFIG[tier];

    return (
        <a
        href={sponsor.url || '#'}
        target="_blank"
        rel="noopener noreferrer"
        className={`
            group relative flex flex-col items-center justify-center gap-3
            ${cfg.cardSize} rounded-2xl border-2 ${cfg.border}
            bg-white px-5 py-5
            transition-all duration-300
            hover:-translate-y-2
            ${cfg.glow}
        `}
        >
        {/* Badge tier */}
        <span className={`
            absolute top-2.5 right-3
            text-[0.6rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full
            ${cfg.badge}
        `}>
            {cfg.label}
        </span>

        {/* Link esterno icon */}
        {sponsor.url && (
            <FontAwesomeIcon
            icon={faArrowUpRightFromSquare}
            className="absolute top-2.5 left-3 text-[0.6rem] text-gray-300 group-hover:text-[#FF6B35] transition-colors"
            />
        )}

        {/* Logo o placeholder */}
        {sponsor.logo_url && imgOk ? (
            <img
            src={sponsor.logo_url}
            alt={`Logo ${sponsor.nome}`}
            className={`${cfg.logoSize} max-w-[160px] w-auto object-contain
                transition-transform duration-300 group-hover:scale-105`}
            onError={() => setImgOk(false)}
            />
        ) : (
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FF6B35]/20 to-[#9B5DE5]/20 flex items-center justify-center text-2xl">
            🏢
            </div>
        )}

        {/* Nome */}
        <span className="
            font-baloo font-bold text-[0.95rem] text-[#2D2D2D]
            text-center leading-tight line-clamp-2
            transition-colors duration-200 group-hover:text-[#FF6B35]
        ">
            {sponsor.nome}
        </span>
        </a>
    );
    }

    // ── TIER SECTION ─────────────────────────────
    function TierSection({ tier, sponsors }) {
    const cfg = TIER_CONFIG[tier];

    if (!sponsors.length) return null;

    // Gold: 1-3 colonne centrate / Silver: 2-4 / Bronze: 3-4
    const gridCols = {
        gold:   'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        silver: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        bronze: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
    };

    return (
        <div className="my-8" data-aos="fade-up">
            {/* Cards grid */}
            <div className={`grid ${gridCols[tier]} gap-5`}>
                {sponsors.map(sponsor => (
                <SponsorCard key={sponsor.id} sponsor={sponsor} tier={tier} />
                ))}
            </div>

            {/* Divider decorativo */}
            <div className={`mt-12 h-px bg-gradient-to-r ${cfg.divider}`} />
        </div>
    );
    }

    // ── MAIN PAGE ────────────────────────────────
    export default function Sponsors() {
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
        .order('tier_order', { ascending: true })
        .order('nome',       { ascending: true });

        if (error) setError(error.message);
        else       setSponsors(data);

        setLoading(false);
    };

    useEffect(() => { load(); }, []);

    // Raggruppa per tier
    const grouped = {
        gold:   sponsors.filter(s => s.tier === 'gold'),
        silver: sponsors.filter(s => s.tier === 'silver'),
        bronze: sponsors.filter(s => s.tier === 'bronze' || !s.tier),
    };

    return (
        <>
        {/* ── HERO ── */}
        <section className="text-4xl font-baloo font-bold text-center text-gray-600 mt-10 pb-3" data-aos="fade-down">
            <div className="max-w-2xl mx-auto">
                <h1 className="font-baloo font-extrabold text-4xl text-gray-700 leading-tight mb-4">
                    <FontAwesomeIcon icon={faHandshakeAlt} className='text-orange-500 pr-2'/>
                    I nostri partner
                </h1>
            </div>
        </section>

        {/* ── SPONSORS ── */}
        <section className="max-w-5xl mx-auto px-6 pb-20 bg-orange-100 p-8 rounded-3xl shadow shadow-gray-400 mb-5">
            <p className="font-baloo text-2xl">
                ColoraBoom! è possibile grazie al prezioso contributo di questi straordinari partner.
                Grazie a loro i bambini possono vivere un'esperienza indimenticabile.
            </p>

            {!loading && !error && sponsors.length > 0 && (
                <div className="flex justify-center gap-6 mt-8 flex-wrap">
                {Object.entries(grouped).map(([tier, list]) =>
                    list.length > 0 && (
                    <div key={tier} className={`flex flex-col items-center px-4 py-2 rounded-full text-sm font-bold shadow shadow-gray-300 w-50 ${TIER_CONFIG[tier].badge}`}>
                        <span>
                            {list.length}
                        </span>
                        <span>
                            {TIER_CONFIG[tier].label} 
                        </span>
                    </div>
                    )
                )}
                </div>
            )}
            
            {/* Loading */}
            {loading && (
            <div className="space-y-12">
                {['h-[200px]', 'h-[180px]', 'h-[160px]'].map((size, i) => (
                <div key={i} className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                    {Array.from({ length: i === 0 ? 3 : i === 1 ? 3 : 4 }).map((_, j) => (
                    <SkeletonCard key={j} size={size} />
                    ))}
                </div>
                ))}
            </div>
            )}

            {/* Error */}
            {error && (
            <div className="text-center py-16">
                <p className="text-gray-400 text-sm mb-3">Impossibile caricare gli sponsor.</p>
                <button
                onClick={load}
                className="text-[#FF6B35] font-bold hover:underline text-sm"
                >
                Riprova →
                </button>
            </div>
            )}

            {/* Empty */}
            {!loading && !error && sponsors.length === 0 && (
            <div className="text-center py-16">
                <p className="text-4xl mb-4">🤝</p>
                <p className="text-gray-400 text-lg mb-2">Nessuno sponsor ancora.</p>
                <p className="text-gray-400 text-sm">
                Vuoi essere il primo?{' '}
                <a
                    href="mailto:info@coloraboom.it?subject=Richiesta%20Sponsorizzazione"
                    className="text-[#FF6B35] font-bold hover:underline"
                >
                    Scrivici →
                </a>
                </p>
            </div>
            )}

            {/* Sezioni per tier */}
            {!loading && !error && sponsors.length > 0 && (
            <>
                <TierSection tier="gold"   sponsors={grouped.gold}   />
                <TierSection tier="silver" sponsors={grouped.silver} />
                <TierSection tier="bronze" sponsors={grouped.bronze} />
            </>
            )}

            {/* CTA diventa sponsor */}
            {!loading && !error && (
            <div className=" text-center px-8 rounded-3xl bg-gradient-to-r from-[#FF6B35]/5 to-[#FF4D8D]/5 border border-orange-100" data-aos="fade-up">
                <p className="text-center my-4 text-sm text-[#aaa]">
                    Vuoi diventare sponsor?{' '}
                <a href="mailto:info@coloraboom.it?subject=Richiesta%20Sponsorizzazione&body=Salve%2C%20vorrei%20informazioni%20per%20diventare%20sponsor%20di%20ColoraBoom!" className="text-[#FF6B35] font-bold hover:underline">
                Contattaci →
                </a>
            </p>
            </div>
            )}

        </section>
        </>
    );
}