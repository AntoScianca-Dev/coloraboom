import SponsorCarousel from "../components/SponsorCarusel"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faCircleInfo, faClock, faFootball, faListCheck, faMapPin, faMusic, faPen, faPenFancy } from '@fortawesome/free-solid-svg-icons';
import { faPaintbrush } from "@fortawesome/free-solid-svg-icons/faPaintbrush";

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
          🎨 Settembre 2026 
        </div>

        <h1 className="text-6xl font-extrabold tracking-tight">
          <span className="text-orange-500">Colora</span>
          <span className="text-pink-500">Boom</span>
          <span>!</span>
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          Il laboratorio creativo dove ogni bambino diventa artista 
          <FontAwesomeIcon icon={faPenFancy} className="text-orange-600 text-lg ps-1"></FontAwesomeIcon>
        </p>
      </header>

      {/* INFO */}
      <div className="flex flex-wrap justify-center gap-4 px-4 mb-16">
        {[
          { icon: faCalendarDays, text: '6 Settembre 2026', color: 'text-orange-300', bgColor: 'border-orange-300' },
          { icon: faClock, text: '9:00 – 17:00', color: 'text-pink-400', bgColor: 'border-pink-400'},
          { icon: faMapPin, text: 'Corso Dante, Molfetta', color: 'text-teal-400', bgColor: 'border-teal-400'}
        ].map((item, i) => (
          <div key={i} data-aos="fade-up" className={`bg-white border-t-4 ${item.bgColor} px-6 py-4 mx-3 rounded-2xl shadow flex flex-col items-center hover:scale-105 transition `}>
            <FontAwesomeIcon icon={item.icon} className={`text-2xl ${item.color} pt-1 pb-3`}></FontAwesomeIcon>
            <div className="font-bold">{item.text}</div>
          </div>
        ))}
      </div>

      {/* ABOUT */}
      <section className="max-w-3xl mx-auto px-4 mb-20" data-aos="fade-up">
        <div className="bg-white p-8 rounded-3xl shadow">
          <p>
            Benvenuti a <strong className="text-orange-500">Colora<span className="text-pink-500">Boom</span><span className="text-gray-500">! </span></strong>
            Un giorno di attività creative per bambini.
          </p>
        </div>
      </section>

      {/* ATTIVITÀ */}
      <section className="max-w-5xl mx-auto px-4 mb-10">
        <h2 className="font-baloo text-3xl text-gray-600 font-bold mb-8" data-aos="fade-up">
          <FontAwesomeIcon icon={faListCheck} className="pr-2 text-orange-500"></FontAwesomeIcon>
          Cosa faremo
        </h2>

        <div className="grid md:grid-cols-3 gap-10 mx-auto my-auto">
          {[
            { icon: faPaintbrush, text: 'Disegno', color: 'text-orange-300', bgColor: 'border-orange-300' },
            { icon: faMusic, text: 'Musica', color: 'text-pink-400', bgColor: 'border-pink-400'},
            { icon: faFootball, text: 'Giochi', color: 'text-teal-400', bgColor: 'border-teal-400'},
            { icon: faPaintbrush, text: 'Disegno 2', color: 'text-orange-300', bgColor: 'border-orange-300' },
            { icon: faMusic, text: 'Musica 2', color: 'text-pink-400', bgColor: 'border-pink-400'},
            { icon: faFootball, text: 'Giochi 2', color: 'text-teal-400', bgColor: 'border-teal-400'}
          ].map((a, i) => (
            <div key={i} data-aos="zoom-in" className={`bg-white p-6 rounded-2xl shadow flex justify-center align-middle items-center  border-2 ${a.bgColor} hover:-translate-y-2 transition h-30`}>
              <FontAwesomeIcon icon={a.icon} className={`${a.color} pr-2`}></FontAwesomeIcon>
              <span className="font-sans">{a.text}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-5 flex justify-center scale-120">
        {/* CTA */}
        <a
        href="/info"
        onClick={(e) => handleAnchorClick(e, '/info')}
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
          <span className="flex">
            <FontAwesomeIcon icon={faCircleInfo} className="text-xl pr-3" />
            Info
          </span>
        </a>
        {/* CTA */}
        <a
        href="/register"
        onClick={(e) => handleAnchorClick(e, '/register')}
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
    </div>
  )
}