import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEnvelope, faPhone, faLocationDot,
    faUsers, faAddressCard
} from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';

// ── MEMBRI — modifica questo array con i dati reali ──
const MEMBRI = [
    { nome: 'Mario Rossi',    ruolo: 'Presidente'            },
    { nome: 'Laura Bianchi',  ruolo: 'Vice Presidente'       },
    { nome: 'Giulia Verdi',   ruolo: 'Segretaria'            },
    { nome: 'Marco Neri',     ruolo: 'Tesoriere'             },
    { nome: 'Anna Russo',     ruolo: 'Responsabile Eventi'   },
    { nome: 'Luca Ferrari',   ruolo: 'Responsabile Comunicazione' },
    { nome: 'Mario Rossi',    ruolo: 'Team Member'            },
    { nome: 'Laura Bianchi',  ruolo: 'Team Member'       },
    { nome: 'Giulia Verdi',   ruolo: 'Team Member'            },
    { nome: 'Marco Neri',     ruolo: 'Team Member'             },
    { nome: 'Anna Russo',     ruolo: 'Team Member'   },
    { nome: 'Luca Ferrari',   ruolo: 'Team Member' },
    ];

    // ── CONTATTI — modifica con i dati reali ──
    const CONTATTI = [
    {
        icon:  faEnvelope,
        label: 'Email',
        value: 'info@coloraboom.it',
        href:  'mailto:info@coloraboom.it',
        color: 'text-[#FF6B35]',
        bg:    'bg-[#FF6B35]/10',
    },
    {
        icon:  faPhone,
        label: 'Telefono',
        value: '+39 333 123 4567',
        href:  'tel:+393331234567',
        color: 'text-[#00C9A7]',
        bg:    'bg-[#00C9A7]/10',
    },
    {
        icon:  faLocationDot,
        label: 'Indirizzo',
        value: 'Comitato Feste Patronali, Cosro Dante 13 — Molfetta',
        href:  'https://www.google.com/maps/place/Comitato+Feste+Patronali/@41.204459,16.5992826,21z/data=!4m6!3m5!1s0x1347f9b92c265da5:0xcd1740033fb6b47c!8m2!3d41.2045197!4d16.5992958!16s%2Fg%2F11bzs3t27_?entry=ttu&g_ep=EgoyMDI2MDUyMC4wIKXMDSoASAFQAw%3D%3D',
        color: 'text-[#9B5DE5]',
        bg:    'bg-[#9B5DE5]/10',
    },
    ];

    // ── SOCIAL — modifica o rimuovi quelli che non usi ──
    const SOCIAL = [
    {
        icon:  faInstagram,
        label: 'Instagram',
        href:  'https://www.instagram.com/comitatofestepatronalimolfetta/',
        color: 'hover:text-[#E1306C]',
    },
    {
        icon:  faFacebook,
        label: 'Facebook',
        href:  'https://www.facebook.com/comitatofestemolfetta',
        color: 'hover:text-[#1877F2]',
    },
];

// ── MEMBER CARD ───────────────────────────────
function MemberCard({ nome, ruolo }) {
    // Genera iniziali per l'avatar
    const initials = nome
        .split(' ')
        .map(n => n[0])
        .slice(0, 2)
        .join('');

    // Colori avatar ciclici coerenti con palette sito
    const colors = [
        'from-[#FF6B35] to-[#FF4D8D]',
        'from-[#9B5DE5] to-[#4A90D9]',
        'from-[#00C9A7] to-[#4A90D9]',
        'from-[#FFD93D] to-[#FF6B35]',
        'from-[#FF4D8D] to-[#9B5DE5]',
        'from-[#4A90D9] to-[#00C9A7]',
    ];
    const colorIndex = nome.charCodeAt(0) % colors.length;

    return (
        <div className="
        group flex flex-col items-center gap-3
        bg-white rounded-2xl px-5 py-6
        border-2 border-[#E8E0FF]
        transition-all duration-300
        hover:-translate-y-1.5
        hover:border-[#FF6B35]
        hover:shadow-[0_12px_32px_rgba(255,107,53,0.12)]
        ">
        {/* Avatar con iniziali */}
        <div className={`
            w-14 h-14 rounded-full
            bg-gradient-to-br ${colors[colorIndex]}
            flex items-center justify-center
            text-white font-baloo font-extrabold text-lg
            transition-transform duration-300 group-hover:scale-110
        `}>
            {initials}
        </div>

        {/* Nome */}
        <div className="text-center">
            <p className="font-baloo font-bold text-[0.95rem] text-gray-700 leading-tight">
            {nome}
            </p>
            {/* Ruolo */}
            <p className="text-[0.75rem] text-[#FF6B35] font-semibold mt-1 uppercase tracking-wide">
            {ruolo}
            </p>
        </div>
        </div>
    );
}

// ── CONTACT CARD ──────────────────────────────
function ContactCard({ icon, label, value, href, color, bg }) {
    return (
        <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel="noopener noreferrer"
        className="
            group flex items-center gap-4
            bg-white rounded-2xl px-6 py-5
            border-2 border-[#E8E0FF]
            transition-all duration-300
            hover:-translate-y-1
            hover:border-[#FF6B35]
            hover:shadow-[0_8px_24px_rgba(255,107,53,0.1)]
        "
        >
        {/* Icona */}
        <div className={`
            w-12 h-12 rounded-xl ${bg}
            flex items-center justify-center flex-shrink-0
            transition-transform duration-300 group-hover:scale-110
        `}>
            <FontAwesomeIcon icon={icon} className={`${color} text-lg`} />
        </div>

        {/* Testo */}
        <div>
            <p className="text-[0.7rem] font-bold uppercase tracking-widest text-gray-400 mb-0.5">
            {label}
            </p>
            <p className="font-semibold text-gray-700 text-sm leading-snug group-hover:text-[#FF6B35] transition-colors">
            {value}
            </p>
        </div>
        </a>
    );
}

// ── MAIN PAGE ─────────────────────────────────
export default function Contatti() {
    return (
        <>
        {/* ── HERO ── */}
        <section className="text-4xl font-baloo font-bold text-center text-gray-600 mt-10 pb-3" data-aos="fade-down">
            <div className="max-w-2xl mx-auto">
                <h1 className="font-baloo font-extrabold text-4xl text-gray-700 leading-tight mb-4">
                    <FontAwesomeIcon icon={faAddressCard} className='text-orange-500 pr-2'/>
                    I nostri contatti
                </h1>
            </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 pb-20 bg-orange-100 p-8 rounded-3xl shadow shadow-gray-400 mb-5">
            <div className="max-w-5xl mx-auto px-6 pb-20 space-y-20">

                {/* ── CONTATTI ── */}
                <section data-aos="fade-up">
                <h2 className="font-baloo font-extrabold text-2xl text-gray-600 flex items-center gap-3 mb-6">
                    <FontAwesomeIcon icon={faAddressCard} className="text-[#FF6B35]" />
                    Recapiti
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    {CONTATTI.map(c => (
                    <ContactCard key={c.label} {...c} />
                    ))}
                </div>

                {/* Social */}
                {SOCIAL.length > 0 && (
                    <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-sm text-gray-400 font-semibold">Seguici su:</span>
                    {SOCIAL.map(s => (
                        <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className={`
                            w-10 h-10 rounded-full bg-white border-2 border-[#E8E0FF]
                            flex items-center justify-center
                            text-gray-400 ${s.color}
                            transition-all duration-200
                            hover:border-current hover:scale-110
                            hover:shadow-md
                        `}
                        >
                        <FontAwesomeIcon icon={s.icon} />
                        </a>
                    ))}
                    </div>
                )}
                </section>

                {/* ── MAPPA ── */}
                <section data-aos="fade-up">
                <h2 className="font-baloo font-extrabold text-2xl text-gray-600 flex items-center gap-3 mb-6">
                    <FontAwesomeIcon icon={faLocationDot} className="text-[#9B5DE5]" />
                    Dove ci trovi
                </h2>
                
                <div className="rounded-2xl overflow-hidden border-2 border-[#E8E0FF] shadow-sm h-[280px]">
                    <iframe
                    title="Mappa sede"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d375.2240226995493!2d16.599147148453245!3d41.204504152659176!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1347f9b92c265da5%3A0xcd1740033fb6b47c!2sComitato%20Feste%20Patronali!5e0!3m2!1sit!2sit!4v1779544554552!5m2!1sit!2sit"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
                </section>

                {/* ── TEAM ── */}
                <section data-aos="fade-up">
                <h2 className="font-baloo font-extrabold text-2xl text-gray-600 flex items-center gap-3 mb-2">
                    <FontAwesomeIcon icon={faUsers} className="text-[#00C9A7]" />
                    Il nostro team
                </h2>
                <p className="text-gray-400 text-sm mb-6">
                    Le persone che rendono possibile ColoraBoom!
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {MEMBRI.map(m => (
                    <MemberCard key={m.nome} nome={m.nome} ruolo={m.ruolo} />
                    ))}
                </div>
                </section>

            </div>
        </section>
        </>
    );
}