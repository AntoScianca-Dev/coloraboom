import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import jsPDF from 'jspdf'
import Papa from 'papaparse'

export default function Admin() {
  // const [data, setData] = useState([])

  const logout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }
  const [data, setData] = useState([])

  useEffect(() => {
    checkUser()
    fetchData()
  }, [])

  const checkUser = async () => {
    const { data } = await supabase.auth.getSession()
    if (!data.session) {
      window.location.href = '/login'
    }
  }

  const fetchData = async () => {
    const { data } = await supabase.from('iscrizioni').select('*')
    setData(data)
  }

  const exportCSV = () => {
    const csv = Papa.unparse(data)
    const blob = new Blob([csv])
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = 'iscritti.csv'
    a.click()
  }

  const exportPDF = () => {
    const doc = new jsPDF()

    data.forEach((row, i) => {
      doc.text(`${row.nome} ${row.cognome}`, 10, 10 + i * 10)
    })

    doc.save('iscritti.pdf')
  }

  return (
    <>
      <div style={{ padding: 20 }}>
        <h2>Admin Dashboard</h2>
        <button onClick={logout}>Logout</button>

        <button onClick={exportCSV}>Export CSV</button>
        <button onClick={exportPDF}>Export PDF</button>

        <ul>
          {data?.map((d) => (
            <li key={d.id}>{d.nome} {d.cognome}</li>
          ))}
        </ul>
      </div>
    </>
  )
}