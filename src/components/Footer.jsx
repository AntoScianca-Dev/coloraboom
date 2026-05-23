import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons/faCalendar';
import { faMapPin } from '@fortawesome/free-solid-svg-icons/faMapPin';
import { faMailBulk } from '@fortawesome/free-solid-svg-icons/faMailBulk';
import { faVoicemail } from '@fortawesome/free-solid-svg-icons/faVoicemail';
import { faMailchimp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';

const LINKS_PUBBLICI = [
    { label: "Home",  to: '/' },
    { label: 'Info',  to: '/info' },
    { label: "Sponsor",  to: '/sponsor' },
    { label: "Contatti",  to: '/contatti' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className=" bg-gray-800 text-white border-t-4 border-[#FF6B35]">

      {/* ── CORPO FOOTER ── */}
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-8">

        {/* Top: logo + nav + contatti */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* LOGO + TAGLINE */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <NavLink
              to="/"
              className="flex items-center gap-2 group select-none tracking-tight text-shadow-2xs text-shadow-[#888]"
              aria-label="ColoraBoom home"
            >
              <span className="text-3xl transition-transform duration-300 group-hover:rotate-12">🎨</span>
              <span
              className="font-extrabold text-2xl leading-none tracking-tight text-orange-500"
              style={{ letterSpacing: '0.001em' }}
              >
              Colora
                  <span className="text-pink-500 transition-colors duration-200">
                      Boom
                  </span>
                  <span className="text-[#888]">!</span>
              </span>
            </NavLink>
            <p className="text-sm text-[#888] leading-relaxed max-w-[220px]">
              Il laboratorio creativo dove ogni bambino diventa artista.
            </p>
          </div>

          {/* NAV LINKS */}
          <div className="flex flex-col gap-3">
            <h3 className="font-baloo font-bold text-[0.7rem] uppercase tracking-[2px] text-pink-500 mb-1">
              Navigazione
            </h3>
            {LINKS_PUBBLICI.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => `
                  font-semibold text-sm w-fit
                  transition-all duration-200 relative group
                  ${isActive ? 'text-[#FF6B35]' : 'text-[#888] hover:text-white'}
                `}
              >
                {({ isActive }) => (
                  <>
                    <span className={`
                      absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full
                      bg-[#FF6B35] transition-all duration-200
                      ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}
                    `}/>
                    {label}
                  </>
                )}
              </NavLink>
            ))}
            {/* CTA mini */}
            <NavLink
              to="/register"
              className="
                mt-2 inline-block font-extrabold text-sm
                text-white px-5 py-2.5 rounded-full w-fit
                bg-gradient-to-r from-[#FF6B35] to-[#FF4D8D]
                shadow-[0_4px_16px_rgba(255,107,53,0.3)]
                hover:shadow-[0_8px_24px_rgba(255,107,53,0.45)]
                hover:-translate-y-0.5
                transition-all duration-200
              "
            >
              <span className="flex items-center">
                <FontAwesomeIcon icon={faPen} className="text-base pr-2" />
                Iscriviti
              </span>
            </NavLink>
          </div>

          {/* CONTATTI */}
          <div className="flex flex-col gap-3">
            <h3 className="font-baloo font-bold text-[0.7rem] uppercase tracking-[2px] text-pink-500 mb-1">
              Contatti
            </h3>
            <a
              href="mailto:info@coloraboom.it"
              className="text-sm text-[#888] hover:text-[#FF6B35] transition-colors duration-200 flex items-center gap-2 group w-fit"
            >
              <FontAwesomeIcon icon={faEnvelope} className="text-teal-600 text-xl"/>
              info@coloraboom.it
            </a>
            <div className="text-sm text-[#888] flex items-center gap-2">
              <FontAwesomeIcon icon={faMapPin} className="text-teal-600 text-xl" />
              Corso Dante 13, Molfetta (BA)
            </div>
            <div className="text-sm text-[#888] flex items-center gap-2">
              <FontAwesomeIcon icon={faCalendar} className="text-teal-600 text-xl" />
              6 Settembre 2025
            </div>
          </div>

        </div>

        {/* ── DIVIDER ── */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#2e2e3a] to-transparent mb-6" />

        {/* ── BOTTOM BAR ── */}
        <div className="text-center text-[#888] text-xs">
          <p>
            © {year} <span className="text-[#FF6B35] font-bold">Antonia Sciancalepore </span> — Tutti i diritti riservati
          </p>
        </div>

      </div>
    </footer>
  );
}