import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSun, faMoon, faCheck, faCircleInfo,
    faLocationDot, faCalendarDay, faEuroSign,
    faArrowRight, faClock,
    faGift, faLock, faUnlock,
    faPen
} from '@fortawesome/free-solid-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle';

// ── PROGRAMMA GIORNATA ────────────────────────
const PROGRAMMA_MATTINO = [
    { ora: '09:00', titolo: 'Accoglienza',          desc: 'Registrazione dei bambini e distribuzione materiali' },
    { ora: '09:30', titolo: 'Apertura laboratori',  desc: 'Presentazione delle attività e dei laboratori creativi' },
    { ora: '10:00', titolo: 'Laboratori creativi',  desc: 'Pittura, scultura, collage e attività manuali guidate' },
    { ora: '12:00', titolo: 'Saluti e premi',        desc: 'Premiazione e consegna delle opere ai bambini' },
    ];

    const PROGRAMMA_SERALE = [
    { ora: '18:00', titolo: 'Apertura evento',       desc: 'Accoglienza famiglie e aperitivo di benvenuto' },
    { ora: '18:30', titolo: 'Mostra opere',          desc: 'Esposizione aperta al pubblico delle creazioni dei bambini' },
    { ora: '19:30', titolo: 'Spettacolo',            desc: 'Performance di teatro e musica a cura dei partecipanti' },
    { ora: '21:00', titolo: 'Premiazione',           desc: 'Consegna attestati e ricordi della giornata' },
];

// ── COSA COMPRENDE ────────────────────────────
const INCLUSO_MATTINO = [
    'Tutti i materiali creativi (colori, tele, argilla…)',
    'Kit ColoraBoom! personalizzato',
    'Attestato di partecipazione',
];

const INCLUSO_SERALE = [
    'Accesso libero alla mostra delle opere',
    'Spettacolo teatrale e musicale',
    'Attestato di partecipazione',
];

// ── TIMELINE ITEM ─────────────────────────────
function TimelineItem({ ora, titolo, desc, index, color }) {
    return (
        <div
        className="flex gap-4 group"
        data-aos="fade-up"
        data-aos-delay={index * 80}
        >
        {/* Linea temporale */}
        <div className="flex flex-col items-center">
            <div className={`
            w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
            text-white text-xs font-bold font-baloo
            bg-gradient-to-br ${color}
            shadow-md group-hover:scale-110 transition-transform duration-200
            `}>
            {ora.split(':')[0]}
            </div>
            <div className="w-0.5 flex-1 bg-gray-100 mt-2 last:hidden" />
        </div>

        {/* Contenuto */}
        <div className="pb-6 pt-1.5 flex-1">
            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
            <span className="font-baloo font-bold text-gray-700 text-[0.95rem]">{titolo}</span>
            <span className="text-[0.7rem] text-gray-400 font-mono">{ora}</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
        </div>
        </div>
    );
}

// ── EVENTO CARD ───────────────────────────────
function EventoCard({ tipo }) {
    const [open, setOpen] = useState(false);
    const isMattino = tipo === 'mattino';

    const cfg = isMattino ? {
        icon:         faSun,
        label:        'Evento Mattutino',
        orario:       '09:00 – 13:00',
        costo:        '15,00 a bambino',
        costoColor:   'text-[#FF6B35]',
        costoBg:      'bg-[#FF6B35]/10',
        iscrizione:   'Obbligatoria',
        iscrizioneBg: 'bg-red-50 text-red-500 border-red-100',
        lockIcon:     faLock,
        gradient:     'from-[#FF6B35] to-[#FFD93D]',
        border:       'border-[#FF6B35]/30',
        headerBg:     'bg-gradient-to-br from-[#FFF5F0] to-[#FFFBEA]',
        timelineColor:'from-[#FF6B35] to-[#FFD93D]',
        programma:    PROGRAMMA_MATTINO,
        incluso:      INCLUSO_MATTINO,
        nota:         `L\'iscrizione online è il primo passo, ma diventa valida solo dopo aver effettuato il pagamento presso la nostra sede in Corso Dante 13, Molfetta`,
        notaColor:    'bg-amber-50 border-amber-200 text-amber-700',
    } : {
        icon:         faMoon,
        label:        'Evento Serale',
        orario:       '18:00 – 21:00',
        costo:        'Ingresso gratuito',
        costoColor:   'text-[#00C9A7]',
        costoBg:      'bg-[#00C9A7]/10',
        iscrizione:   'Consigliata',
        iscrizioneBg: 'bg-teal-50 text-teal-600 border-teal-100',
        lockIcon:     faUnlock,
        gradient:     'from-[#9B5DE5] to-[#4A90D9]',
        border:       'border-[#9B5DE5]/30',
        headerBg:     'bg-gradient-to-br from-[#F8F0FF] to-[#F0F4FF]',
        timelineColor:'from-[#9B5DE5] to-[#4A90D9]',
        programma:    PROGRAMMA_SERALE,
        incluso:      INCLUSO_SERALE,
        nota:         `L\'iscrizione è consigliata per permetterci di organizzare al meglio l\'evento. L\'accesso rimane libero a tutti durante tutto l'evento serale.`,
        notaColor:    'bg-blue-50 border-blue-200 text-blue-600',
    };

    return (
        <div
        className={`rounded-3xl border-2 ${cfg.border} bg-orange-50 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300`}
        data-aos="fade-up"
        >
            {/* Header card */}
            <div className={`${cfg.headerBg} px-7 py-6`}>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cfg.gradient} flex items-center justify-center shadow-md`}>
                    <FontAwesomeIcon icon={cfg.icon} className="text-white text-xl" />
                    </div>
                    <div>
                    <h3 className="font-baloo font-extrabold text-xl text-gray-700">{cfg.label}</h3>
                    <div className="flex items-center gap-1.5 text-gray-400 text-sm mt-0.5">
                        <FontAwesomeIcon icon={faClock} className="text-xs" />
                        <span>{cfg.orario}</span>
                    </div>
                    </div>
                </div>

                {/* Badges */}
                <div className="flex flex-col gap-2 items-end">
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${cfg.costoBg}`}>
                    <FontAwesomeIcon icon={faEuroSign} className={`text-xs ${cfg.costoColor}`} />
                    <span className={`font-bold text-sm ${cfg.costoColor}`}>{cfg.costo}</span>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold ${cfg.iscrizioneBg}`}>
                    <FontAwesomeIcon icon={cfg.lockIcon} className="text-[0.65rem]" />
                    Iscrizione {cfg.iscrizione}
                    </div>
                </div>
                </div>

                {/* Info rapide */}
                <div className="flex gap-4 mt-5 flex-wrap">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FontAwesomeIcon icon={faCalendarDay} className="text-[#FF6B35] text-xs" />
                    <span>6 Settembre 2026</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FontAwesomeIcon icon={faLocationDot} className="text-[#9B5DE5] text-xs" />
                    <span>Corso Dante, Molfetta</span>
                </div>
                </div>
            </div>

            {/* Body */}
            <div className="px-7 py-6 bg-orange-50 space-y-6">

                {/* Nota importante */}
                <div className={`flex gap-3 p-4 rounded-xl border text-sm leading-relaxed ${cfg.notaColor}`}>
                <FontAwesomeIcon icon={faCircleInfo} className="mt-0.5 flex-shrink-0" />
                <p>{cfg.nota}</p>
                </div>

                {/* Cosa comprende */}
                <div>
                <h4 className="font-baloo font-bold text-gray-600 text-base mb-3 flex items-center gap-2">
                    <FontAwesomeIcon icon={faGift} className={cfg.costoColor} />
                    Cosa comprende l'iscrizione
                </h4>
                <ul className="space-y-2">
                    {cfg.incluso.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-500">
                        <FontAwesomeIcon icon={faCheck} className={`${cfg.costoColor} mt-0.5 flex-shrink-0 text-xs`} />
                        {item}
                    </li>
                    ))}
                </ul>
                </div>

                {/* Programma accordion */}
                <div>
                <button
                    onClick={() => setOpen(!open)}
                    className="w-full flex items-center justify-between group"
                >
                    <h4 className="font-baloo font-bold text-gray-600 text-base flex items-center gap-2">
                    <FontAwesomeIcon icon={faClock} className={cfg.costoColor} />
                    Programma dettagliato
                    </h4>
                    <span className={`
                    text-gray-400 text-sm font-semibold flex items-center gap-1
                    transition-colors group-hover:text-[#FF6B35]
                    `}>
                    {open ? 'Chiudi' : 'Mostra'}
                    <FontAwesomeIcon
                        icon={faArrowRight}
                        className={`text-xs transition-transform duration-300 ${open ? 'rotate-90' : ''}`}
                    />
                    </span>
                </button>

                {open && (
                    <div className="mt-4 pl-2">
                    {cfg.programma.map((item, i) => (
                        <TimelineItem
                        key={i}
                        index={i}
                        color={cfg.timelineColor}
                        {...item}
                        />
                    ))}
                    </div>
                )}
                </div>

                {/* CTA */}
                <NavLink
                to="/register"
                className={`
                    w-full flex items-center justify-center gap-2
                    py-3.5 rounded-2xl font-extrabold text-sm text-white
                    bg-gradient-to-r ${cfg.gradient}
                    shadow-md hover:shadow-lg hover:-translate-y-0.5
                    transition-all duration-200
                `}
                >
                {isMattino ? 'Iscriviti ora (obbligatorio)' : 'Prenota il tuo posto'}
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                </NavLink>

            </div>
        </div>
    );
}

// ── MAIN PAGE ─────────────────────────────────
export default function Info() {
    return (
        <>
            {/* ── HERO ── */}
            <section className="text-4xl font-baloo font-bold text-center text-gray-600 mt-10 pb-3" data-aos="fade-down">
                <div className="max-w-2xl mx-auto">
                    <h1 className="font-baloo font-extrabold text-4xl text-gray-700 leading-tight mb-4">
                        <FontAwesomeIcon icon={faInfoCircle} className='text-orange-500 pr-2'/>
                        Info della giornata
                    </h1>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 pb-20 bg-orange-100 p-8 rounded-3xl shadow shadow-gray-400 mb-5">
                <div className="max-w-6xl mx-auto px-6 pb-20 space-y-16">

                    {/* ── PANORAMICA ── */}
                    <section data-aos="fade-up">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4  mx-auto">
                            {[
                            { icon: faCalendarDay, label: 'Data',     value: '6 Settembre 2026', color: 'text-orange-300', bColor: 'border-orange-300'},
                            { icon: faLocationDot, label: 'Luogo',    value: 'Corso Dante 13, Molfetta', color: 'text-pink-400', bColor: 'border-pink-400' },
                            ].map(({ icon, label, value, color, bColor }) => (
                            <div key={label} className="bg-white rounded-2xl border-2 border-[#E8E0FF] px-5 py-4 flex items-center gap-4">
                                <div className={`w-11 h-11 rounded-xl border ${bColor} flex items-center justify-center`}>
                                <FontAwesomeIcon icon={icon} className={`${color} text-base`} />
                                </div>
                                <div>
                                <p className="text-[0.68rem] font-bold uppercase tracking-widest text-gray-400">{label}</p>
                                <p className="font-semibold text-gray-700 text-sm leading-snug">{value}</p>
                                </div>
                            </div>
                            ))}
                        </div>
                    </section>

                    {/* ── LE DUE CARD EVENTO ── */}
                    <section>
                    <h2 className="font-baloo font-extrabold text-2xl text-gray-600 mb-8 flex items-center gap-3">
                        <FontAwesomeIcon icon={faCalendarDay} className="text-[#FF6B35]" />
                        I due momenti dell'evento
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <EventoCard tipo="mattino" />
                        <EventoCard tipo="serale" />
                    </div>
                    </section>

                    {/* ── DOMANDE FREQUENTI ── */}
                    <section data-aos="fade-up">
                    <h2 className="font-baloo font-extrabold text-2xl text-gray-600 mb-6 flex items-center gap-3">
                        <FontAwesomeIcon icon={faCircleInfo} className="text-[#4A90D9]" />
                        Domande frequenti
                    </h2>
                    <div className="space-y-3">
                        {[
                        {
                            q: 'Posso iscrivermi solo all\'evento serale?',
                            a: 'Sì, i due eventi sono indipendenti. Puoi iscriverti solo al mattino, solo alla sera, o a entrambi.'
                        },
                        {
                            q: 'Cosa succede se non riesco a pagare prima dell\'evento?',
                            a: 'Il posto verrà liberato e assegnato ad altri iscritti. Ti consigliamo di presentarti in sede il prima possibile dopo l\'iscrizione.'
                        },
                        {
                            q: 'I materiali sono inclusi nel prezzo?',
                            a: 'Sì, tutto il materiale creativo necessario è incluso nella quota di iscrizione. I bambini non devono portare nulla.'
                        },
                        ].map(({ q, a }, i) => (
                        <FaqItem key={i} question={q} answer={a} index={i} />
                        ))}
                    </div>
                    </section>

                    {/* ── CTA FINALE ── */}
                    <section data-aos="fade-up">
                    <div className="text-center p-10 rounded-3xl bg-gradient-to-br from-[#FF6B35]/5 via-[#FF4D8D]/5 to-[#9B5DE5]/5 border border-orange-100">
                        <p className="text-gray-400 text-sm mb-6 mx-auto">
                        I posti per il laboratorio mattutino sono limitati. Iscriviti subito per assicurare il posto!
                        </p>
                        <NavLink
                        to="/register"
                        className="
                                    ml-2 font-extrabold text-[0.88rem]
                                    text-white px-5 py-[9px] rounded-full
                                    bg-gradient-to-r from-[#FF6B35] to-[#FF4D8D]
                                    shadow-[0_2px_2px_rgba(255,107,53,0.35)]
                                    hover:shadow-[0_4px_4px_rgba(255,107,53,0.45)]
                                    hover:-translate-y-0.5
                                    transition-all duration-200
                                    whitespace-nowrap
                        "
                        >
                            <FontAwesomeIcon icon={faPen} className="pr-2" />
                            Iscriviti
                        </NavLink>



                    </div>
                    </section>
                </div>
            </section>
        </>
    );
}

// ── FAQ ITEM (accordion) ──────────────────────
function FaqItem({ question, answer, index }) {
    const [open, setOpen] = useState(false);

    return (
        <div
        className={`
            rounded-2xl border-2 overflow-hidden transition-all duration-300
            ${open ? 'border-[#FF6B35]/40 shadow-sm' : 'border-[#E8E0FF]'}
        `}
        data-aos="fade-up"
        data-aos-delay={index * 60}
        >
        <button
            onClick={() => setOpen(!open)}
            className="w-full flex items-center justify-between gap-4 px-6 py-4 bg-white text-left group"
        >
            <span className="font-semibold text-gray-700 text-sm group-hover:text-[#FF6B35] transition-colors">
            {question}
            </span>
            <FontAwesomeIcon
            icon={faArrowRight}
            className={`
                text-gray-400 text-xs flex-shrink-0
                transition-transform duration-300
                ${open ? 'rotate-90 text-[#FF6B35]' : ''}
            `}
            />
        </button>
        {open && (
            <div className="px-6 pb-4 bg-white">
            <p className="text-sm text-gray-400 leading-relaxed border-t border-gray-100 pt-3">
                {answer}
            </p>
            </div>
        )}
        </div>
    );
}