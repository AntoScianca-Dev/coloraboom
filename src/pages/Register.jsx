import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Register() {
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

  return (
    <form onSubmit={handleSubmit} style={{ padding: 20 }}>
      <h2>Iscrizione</h2>
      <input name="nome" placeholder="Nome" onChange={handleChange} required />
      <input name="cognome" placeholder="Cognome" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="telefono" placeholder="Telefono" onChange={handleChange} />
      <input name="eta_bambino" placeholder="Età bambino" onChange={handleChange} />
      <button type="submit">Invia</button>
    </form>
  )
}
