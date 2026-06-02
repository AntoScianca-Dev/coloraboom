import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons/faTriangleExclamation';

export default function Register() {
  const [form, setForm] = useState({})
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const err = {}
    if (!form.nome_bambino) err.nome_bambino = 'Richiesto'
    if (!form.cognome_bambino) err.cognome_bambino = 'Richiesto'
    if (!form.eta_bambino) err.eta_bambino = 'Richiesto'
    if (!form.evento) err.evento = 'Richiesto'
    if (!form.nome_genitore) err.nome_genitore = 'Richiesto'
    if (!form.cognome_genitore) err.cognome_genitore = 'Richiesto'
    if (!form.telefono) err.telefono = 'Richiesto'
    if (!form.email) err.email = 'Richiesto'
    if (form.privacy !== true) err.privacy = 'Devi accettare la privacy policy'
    return err
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validation = validate()
    if (Object.keys(validation).length > 0) {
      setErrors(validation)
      return
    }

    setLoading(true)

    const { error } = await supabase.from('iscrizioni').insert([form])

    setLoading(false)

    if (error) {
      alert(error.message)
    } else {
      
      setSuccess(true)

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })

      setTimeout(() => {
        setSuccess(false)
        setForm({})
        setErrors({})
      }, 5000)
    }
  }


  return (
    <>
      <h2 className='text-4xl font-baloo font-bold text-center text-gray-600 mt-10 pb-3'>
      <FontAwesomeIcon icon={faPenToSquare} className='text-orange-500 pr-2'></FontAwesomeIcon>
      Iscriviti ora!</h2>
      
      {/* FORM */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        {!success ? (
          <div className="bg-orange-100 p-8 rounded-3xl shadow shadow-gray-400" data-aos="fade-up">
            <h2 className='font-baloo text-2xl pb-5'>Compila il modulo</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <section className='shadow p-5 rounded-2xl shadow-gray-800'>
                  <h3 className='font-sans text-2xl [font-variant:small-caps] text-gray-500 text-center pb-3'> Dati Bambino</h3>
                  <div className='grid md:grid-cols-2 gap-3 '>
                    <div>
                      <label className="text-gray-400 [font-variant:small-caps]" htmlFor="nome_bambino">Nome *</label>
                      <input id='nome_bambino' type="text" name="nome_bambino" placeholder="Es. Sofia"
                        onChange={handleChange}
                        className="w-full p-3 border rounded-xl bg-amber-50 h-12"
                        required
                      />
                      {errors.nome_bambino && <p className="text-red-500 text-sm">{errors.nome_bambino}</p>}
                    </div>

                    <div>
                      <label className="text-gray-400 [font-variant:small-caps]" htmlFor="cognome_bambino">Cognome *</label>
                      <input id='cognome_bambino' type="text" name="cognome_bambino" placeholder="Es. Rossi"
                        onChange={handleChange}
                        className="w-full p-3 border rounded-xl bg-amber-50 h-12"
                        required
                      />
                      {errors.cognome_bambino && <p className="text-red-500 text-sm">{errors.cognome_bambino}</p>}
                    </div>

                    <div>
                      <label className="text-gray-400 [font-variant:small-caps]" htmlFor="eta_bambino">Età *</label>
                      <input id='eta_bambino' type="numeric" name="eta_bambino" placeholder="Es. 3"
                        onChange={handleChange}
                        className="w-full p-3 border rounded-xl bg-amber-50 h-12"
                        required
                      />
                      {errors.eta_bambino && <p className="text-red-500 text-sm">{errors.eta_bambino}</p>}
                    </div>

                    <div>
                      <label className="text-gray-400 [font-variant:small-caps]" htmlFor="cognome_bambino">Evento *</label>
                      <select className="w-full p-3 border rounded-xl bg-amber-50 h-12" id="evento" name="evento" onChange={handleChange} required>
                        <option value="">Seleziona evento</option>
                        <option>Mattino</option>
                        <option>Serale</option>
                        <option>Entrambi</option>
                      </select>
                      {errors.evento && <p className="text-red-500 text-sm">{errors.evento}</p>}
                    </div>
                  </div>
                </section>

                <section className='shadow p-5 rounded-2xl shadow-gray-800'>
                  <h3 className='font-sans text-2xl [font-variant:small-caps] text-gray-500 text-center pb-3'> Dati Genitore/Tutore</h3>
                  <div className='grid md:grid-cols-2 gap-3 '>
                    <div>
                      <label className="text-gray-400 [font-variant:small-caps]" htmlFor="nome_genitore">Nome *</label>
                      <input id='nome_genitore' type="text" name="nome_genitore" placeholder="Es. Maria"
                        onChange={handleChange}
                        className="w-full p-3 border rounded-xl bg-amber-50 h-12"
                        required
                      />
                      {errors.nome_genitore && <p className="text-red-500 text-sm">{errors.nome_genitore}</p>}
                    </div>

                    <div>
                      <label className="text-gray-400 [font-variant:small-caps]" htmlFor="cognome_genitore">Cognome *</label>
                      <input id='cognome_genitore' type="text" name="cognome_genitore" placeholder="Es. Bianchi"
                        onChange={handleChange}
                        className="w-full p-3 border rounded-xl bg-amber-50 h-12"
                        required
                      />
                      {errors.cognome_genitore && <p className="text-red-500 text-sm">{errors.cognome_genitore}</p>}
                    </div>

                    <div>
                      <label className="text-gray-400 [font-variant:small-caps]" htmlFor="telefono">Telefono *</label>
                      <input id="telefono" type="tel" name="telefono" placeholder="Es. 333 1234567" 
                        onChange={handleChange}
                        className="w-full p-3 border rounded-xl bg-amber-50 h-12"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-gray-400 [font-variant:small-caps]" htmlFor="email">Email *</label>
                      <input id="email" type="email" name="email" placeholder="Es. lamiamail@email.it" 
                        onChange={handleChange}
                        className="w-full p-3 border rounded-xl bg-amber-50 h-12"
                        required
                      />
                    </div>
                  </div>
                </section>

                <section className='shadow py-5 px-5 md:px-15 rounded-2xl shadow-gray-800 flex flex-col gap-5'>
                  <div className='flex flex-col gap-5 md:flex-row'>
                    <input className='scale-200' type="checkbox" name="privacy" onChange={handleChange} />
                    <label className="flex gap-2 text-gray-600 font-sans" htmlFor="privacy">
                        Acconsento al trattamento dei dati personali ai sensi del GDPR per la gestione
                        dell'iscrizione a ColoraBoom! I dati non saranno ceduti a terzi.
                    </label>
                  </div>

                  {/* Messaggio errore privacy */}
                  {errors.privacy && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <FontAwesomeIcon icon={faTriangleExclamation} className="text-xs" />
                      Devi accettare la privacy policy per procedere
                    </p>
                  )}
                </section>

                <div className='flex justify-center'>
                  <button
                    disabled={loading}
                    className="font-extrabold text-xl
                      text-white px-10 py-3 rounded-full
                      bg-gradient-to-r from-[#FF6B35] to-[#FF4D8D]
                      shadow-[0_2px_2px_rgba(255,107,53,0.35)]
                      hover:shadow-[0_4px_4px_rgba(255,107,53,0.45)]
                      hover:-translate-y-0.5
                      transition-all duration-200
                      whitespace-nowrap"
                  >
                    {loading ? 'Invio...' : 'Iscriviti'}
                  </button>
                </div>
              </form>
          </div>
        ) : (
          <div className="shadow py-5 px-15 rounded-2xl shadow-gray-800 flex flex-col gap-5" id="successMsg">
            <h3 className='text-green-400 font-baloo font-bold text-2xl text-shadow-2xs'>Iscrizione ricevuta!</h3>
            <p className='text-xl'>Ci vediamo a settembre per un'esperienza indimenticabile.</p>

            {/* Barra countdown */}
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#FF6B35] to-[#FF4D8D] rounded-full"
                style={{ animation: 'shrink 5s linear forwards' }}
              />
            </div>
          </div>
        )}
      </section>
    </>
  )
}
