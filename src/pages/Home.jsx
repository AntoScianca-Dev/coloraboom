import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Evento Bambini 🎉</h1>
      <p>Un evento speciale a settembre!</p>
      <Link to="/register">Iscriviti</Link>
      <br />
      <Link to="/login">Area Admin</Link>
    </div>
  )
}