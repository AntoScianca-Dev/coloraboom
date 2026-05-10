import SponsorCarousel from "../components/SponsorCarusel"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faPen } from '@fortawesome/free-solid-svg-icons';

export default function Home() {

  return (
    <div className=" text-gray-500  overflow-hidden">
      {/* BLOBS */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute w-[400px] h-[400px] bg-yellow-300 opacity-20 blur-3xl rounded-full animate-pulse top-[-100px] left-[-100px]" />
        <div className="absolute w-[300px] h-[300px] bg-pink-400 opacity-20 blur-3xl rounded-full animate-pulse top-[30%] right-[-80px]" />
        <div className="absolute w-[250px] h-[250px] bg-teal-400 opacity-20 blur-3xl rounded-full animate-pulse bottom-[10%] left-[20%]" />
      </div>

      {/* HEADER */}
      <header className="text-center py-20 px-4" data-aos="fade-up">
        <div className="bg-orange-500 text-white px-4 py-1 rounded-full inline-block text-sm font-bold mb-4">
          🎨 Settembre 2025 · 5-12 anni
        </div>

        <h1 className="text-6xl font-extrabold tracking-tight">
          <span className="text-orange-500">Colora</span>
          <span className="text-pink-500">Boom</span>
          <span>!</span>
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          Il laboratorio creativo dove ogni bambino diventa artista 🖌️
        </p>

        <div className="text-2xl mt-2">⭐🌈✨🎭🌟</div>
      </header>

      {/* INFO */}
      <div className="flex flex-wrap justify-center gap-4 px-4 mb-16">
        {[
          { icon: '📅', text: '13–14 Settembre' },
          { icon: '🕙', text: '9:00 – 17:00' },
          { icon: '📍', text: 'Via Roma 12' },
          { icon: '👧', text: '5 – 12 anni' }
        ].map((item, i) => (
          <div key={i} data-aos="fade-up" className="bg-white px-6 py-4 rounded-2xl shadow hover:scale-105 transition">
            <div className="text-xl">{item.icon}</div>
            <div className="font-bold">{item.text}</div>
          </div>
        ))}
      </div>

      {/* ABOUT */}
      <section className="max-w-3xl mx-auto px-4 mb-20" data-aos="fade-up">
        <div className="bg-white p-8 rounded-3xl shadow">
          <p>
            Benvenuti a <strong className="text-orange-500">ColoraBoom!</strong> 🎨
            Due giorni di attività creative per bambini dai 5 ai 12 anni.
          </p>
        </div>
      </section>

      {/* ATTIVITÀ */}
      <section className="max-w-5xl mx-auto px-4 mb-20">
        <h2 className="text-3xl font-bold mb-8" data-aos="fade-up">✨ Cosa faremo</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            '🖌️ Pittura',
            '🏺 Argilla',
            '🎭 Teatro',
            '📸 Foto',
            '✂️ Collage',
            '🎵 Musica'
          ].map((a, i) => (
            <div key={i} data-aos="zoom-in" className="bg-white p-6 rounded-2xl shadow hover:-translate-y-2 transition">
              {a}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-5 flex justify-center scale-120">
        {/* CTA */}
        <a
        href="/register"
        onClick={(e) => handleAnchorClick(e, '/register')}
        className="
            ml-2 font-['Nunito'] font-extrabold text-[0.88rem]
            text-white px-5 py-[9px] rounded-full
            bg-gradient-to-r from-[#FF6B35] to-[#FF4D8D]
            shadow-[0_2px_2px_rgba(255,107,53,0.35)]
            hover:shadow-[0_4px_4px_rgba(255,107,53,0.45)]
            hover:-translate-y-0.5
            transition-all duration-200
            whitespace-nowrap
        "
        >
          <span className="flex">
            <FontAwesomeIcon icon={faCircleInfo} className="text-xl pr-3" />
            Info
          </span>
        </a>
        {/* <i class="fa-solid fa-circle-info"></i> */}
        {/* CTA */}
        <a
        href="/register"
        onClick={(e) => handleAnchorClick(e, '/register')}
        className="
            ml-2 font-['Nunito'] font-extrabold text-[0.88rem]
            text-white px-5 py-[9px] rounded-full
            bg-gradient-to-r from-[#FF6B35] to-[#FF4D8D]
            shadow-[0_2px_2px_rgba(255,107,53,0.35)]
            hover:shadow-[0_4px_4px_rgba(255,107,53,0.45)]
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
      </section>

      {/* SPONSOR */}   
      <section>
        <SponsorCarousel></SponsorCarousel>
      </section>


          <script src="https://kit.fontawesome.com/0ee0f719c4.js" crossorigin="anonymous"></script>
    </div>
  )
}