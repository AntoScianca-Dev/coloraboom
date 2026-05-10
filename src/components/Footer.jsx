import { NavLink } from 'react-router-dom';

const LINKS_PUBBLICI = [
    { label: "L'evento",  to: '/'          },
    { label: 'Registrati',  to: '/register'  },
    { label: 'Login',   to: '/login'   },
    { label: 'Admin', to: '/admin' },
];

const LOGO_LETTERS = [
    { char: 'C', color: 'text-[#FF6B35]' },
    { char: 'o', color: 'text-[#FF4D8D]' },
    { char: 'l', color: 'text-[#9B5DE5]' },
    { char: 'o', color: 'text-[#00C9A7]' },
    { char: 'r', color: 'text-[#FFD93D]' },
    { char: 'a', color: 'text-[#4A90D9]' },
    { char: 'B', color: 'text-[#FF4D8D]' },
    { char: 'o', color: 'text-[#FF6B35]' },
    { char: 'o', color: 'text-[#9B5DE5]' },
    { char: 'm', color: 'text-[#00C9A7]' },
    { char: '!', color: 'text-[#FF6B35]' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1E1E26] text-white">

      {/* ── WAVE DECORATIVA ── */}
      <div className="overflow-hidden leading-[0] rotate-180">
        <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-12 fill-[#FFF9F0]">
          <path d="M0,30 C300,60 900,0 1200,30 L1200,60 L0,60 Z"/>
        </svg>
      </div>

      {/* ── CORPO FOOTER ── */}
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-8">

        {/* Top: logo + nav + contatti */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* LOGO + TAGLINE */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <NavLink to="/" className="group inline-flex items-center gap-2" aria-label="ColoraBoom home">
              <span className="text-3xl transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                🎨
              </span>
              <span
                className="font-['Baloo_2'] font-extrabold text-[2rem] leading-none"
                style={{ letterSpacing: '-0.04em' }}
              >
                {LOGO_LETTERS.map(({ char, color }, i) => (
                  <span
                    key={i}
                    className={`${color} inline-block transition-transform duration-200 hover:-translate-y-1`}
                  >
                    {char}
                  </span>
                ))}
              </span>
            </NavLink>
            <p className="font-['Nunito'] text-sm text-[#888] leading-relaxed max-w-[220px]">
              Il laboratorio creativo dove ogni bambino diventa artista. 🖌️
            </p>
            {/* Pallini colorati decorativi */}
            <div className="flex gap-2 mt-1">
              {['#FF6B35','#FF4D8D','#9B5DE5','#00C9A7','#FFD93D'].map(c => (
                <span
                  key={c}
                  className="w-2.5 h-2.5 rounded-full opacity-80"
                  style={{ background: c }}
                />
              ))}
            </div>
          </div>

          {/* NAV LINKS */}
          <div className="flex flex-col gap-3">
            <h3 className="font-['Baloo_2'] font-bold text-[0.7rem] uppercase tracking-[2px] text-[#555] mb-1">
              Navigazione
            </h3>
            {LINKS_PUBBLICI.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => `
                  font-['Nunito'] font-semibold text-sm w-fit
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
          </div>

          {/* CONTATTI */}
          <div className="flex flex-col gap-3">
            <h3 className="font-['Baloo_2'] font-bold text-[0.7rem] uppercase tracking-[2px] text-[#555] mb-1">
              Contatti
            </h3>
            <a
              href="mailto:info@coloraboom.it"
              className="font-['Nunito'] text-sm text-[#888] hover:text-[#FF6B35] transition-colors duration-200 flex items-center gap-2 group w-fit"
            >
              <span className="text-base transition-transform duration-200 group-hover:-rotate-12">✉️</span>
              info@coloraboom.it
            </a>
            <div className="font-['Nunito'] text-sm text-[#888] flex items-center gap-2">
              <span className="text-base">📍</span>
              Centro Civico, Via Roma 12
            </div>
            <div className="font-['Nunito'] text-sm text-[#888] flex items-center gap-2">
              <span className="text-base">📅</span>
              13–14 Settembre 2025
            </div>

            {/* CTA mini */}
            <NavLink
              to="/register"
              className="
                mt-2 inline-block font-['Nunito'] font-extrabold text-sm
                text-white px-5 py-2.5 rounded-full w-fit
                bg-gradient-to-r from-[#FF6B35] to-[#FF4D8D]
                shadow-[0_4px_16px_rgba(255,107,53,0.3)]
                hover:shadow-[0_8px_24px_rgba(255,107,53,0.45)]
                hover:-translate-y-0.5
                transition-all duration-200
              "
            >
              Iscriviti ora 🚀
            </NavLink>
          </div>

        </div>

        {/* ── DIVIDER ── */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#2e2e3a] to-transparent mb-6" />

        {/* ── BOTTOM BAR ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[#555] font-['Nunito'] text-xs">
          <p>
            © {year} <span className="text-[#FF6B35] font-bold">ColoraBoom!</span> — Tutti i diritti riservati
          </p>
          <p className="flex items-center gap-1">
            Fatto con <span className="text-[#FF4D8D] text-sm mx-0.5">♥</span> per i piccoli artisti del futuro
          </p>
        </div>

      </div>
    </footer>
  );
}