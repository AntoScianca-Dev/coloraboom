import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Register from './pages/Register'
import Info from './pages/Info'
import Sponsor from './pages/Sponsor'
import Contatti from './pages/Contatti'
import './App.css'

import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login'
import Admin from './pages/Admin'


export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/info" element={<Info />} />
        <Route path="/sponsor" element={<Sponsor />} />
        <Route path="/contatti" element={<Contatti />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        } />
      </Route>
    </Routes>
  )
}