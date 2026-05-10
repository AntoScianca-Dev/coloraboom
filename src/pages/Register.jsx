import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Register() {
  /*
  const [form, setForm] = useState({})

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { error } = await supabase.from('iscrizioni').insert([form])
    console.log(await supabase.auth.getSession())
    if (error) alert(error.message)
    else alert('Iscrizione completata!')
  }


  */
  const [form, setForm] = useState({})
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const err = {}
    if (!form.nome) err.nome = 'Richiesto'
    if (!form.cognome) err.cognome = 'Richiesto'
    if (!form.email) err.email = 'Richiesto'
    if (!form.telefono) err.telefono = 'Richiesto'
    if (!form.eta_bambino) err.eta_bambino = 'Richiesto'
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
    }
  }


  return (
    <>
      <form onSubmit={handleSubmit} style={{ padding: 20 }}>
        <h2>Iscrizione</h2>
        <input name="nome" placeholder="Nome" onChange={handleChange} required />
        <input name="cognome" placeholder="Cognome" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="telefono" placeholder="Telefono" onChange={handleChange} />
        <input name="eta_bambino" placeholder="Età bambino" onChange={handleChange} />
        <button type="submit">Invia</button>
      </form>

      
      {/* FORM */}
      <section className="max-w-xl mx-auto px-4 pb-20">
        <div className="bg-white p-8 rounded-3xl shadow" data-aos="fade-up">

          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-4">

              <input name="nome" placeholder="Nome bambino"
                onChange={handleChange}
                className="w-full p-3 border rounded-xl"
              />
              {errors.nome && <p className="text-red-500 text-sm">{errors.nome}</p>}

              <input name="cognome" placeholder="Cognome"
                onChange={handleChange}
                className="w-full p-3 border rounded-xl"
              />

              <input name="telefono" placeholder="Telefono"
                onChange={handleChange}
                className="w-full p-3 border rounded-xl"
              />

              <input name="eta_bambino" placeholder="3" type='numeric'
                onChange={handleChange}
                className="w-full p-3 border rounded-xl"
              />

              <input name="email" placeholder="Email" type='email'
                onChange={handleChange}
                className="w-full p-3 border rounded-xl"
              />

              <label className="flex gap-2">
                <input type="checkbox" name="privacy" onChange={handleChange} />
                Accetto privacy
              </label>

              <button
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white p-4 rounded-xl font-bold"
              >
                {loading ? 'Invio...' : 'Iscriviti 🎨'}
              </button>

            </form>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl text-green-500 font-bold">🎉 Iscrizione completata!</h2>
            </div>
          )}

        </div>
      </section>
    </>
  )
}
