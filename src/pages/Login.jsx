import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faLock, faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function Login() {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPwd,  setShowPwd]  = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (error) {
      setError('Credenziali non valide. Riprova.');
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5">
      <div className="w-full max-w-md">

        {/* Card */}
        <div
          className="rounded-3xl p-12 shadow-[0_32px_80px_rgba(0,0,0,0.5)] bg-gray-800"
        >

          {/* Logo */}
          <div className="mb-8">
            <div
              className="font-baloo font-extrabold text-4xl leading-none mb-2"
              style={{ letterSpacing: '-0.04em', color: '#f0eeff' }}
            >
              Colora<span className="text-[#FF6B35]">Boom!</span>
            </div>
            <p
              className="text-sm font-mono tracking-wider text-orange-100"
            >
              // area riservata admin
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">

            {/* Email */}
            <div>
              <label
                className="block text-[0.7rem] font-bold uppercase tracking-[2px] mb-2 text-teal-400"
              >
                Email
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-pink-400"
                />
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(''); }}
                  autoComplete="email"
                  required
                  className="
                    w-full pl-11 pr-4 py-3.5 rounded-xl
                    font-mono text-sm outline-none
                    transition-all duration-20
                    bg-gray-900 text-pink-400
                  "
                  style={{
                    border: `1px solid ${error ? '#ff4d4d' : '#2e2e3a'}`,
                    boxShadow: error ? '0 0 0 3px rgba(255,77,77,0.1)' : '',
                  }}
                  onFocus={e => { if (!error) e.target.style.borderColor = '#FF6B35'; e.target.style.boxShadow = '0 0 0 3px rgba(255,107,53,0.12)'; }}
                  onBlur={e  => { e.target.style.borderColor = error ? '#ff4d4d' : '#2e2e3a'; e.target.style.boxShadow = ''; }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                className="block text-[0.7rem] font-bold uppercase tracking-[2px] mb-2 text-teal-400"
              >
                Password
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faLock}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-pink-400"
                />
                <input
                  type={showPwd ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  autoComplete="current-password"
                  required
                  className="
                    w-full pl-11 pr-12 py-3.5 rounded-xl
                    font-mono text-sm outline-none tracking-widest
                    transition-all duration-200
                    placeholder:tracking-normal placeholder:text-pink-200
                    bg-gray-900 text-pink-400
                  "
                  style={{
                    border: `1px solid ${error ? '#ff4d4d' : '#2e2e3a'}`,
                    boxShadow: error ? '0 0 0 3px rgba(255,77,77,0.1)' : '',
                  }}
                  onFocus={e => { if (!error) e.target.style.borderColor = '#FF6B35'; e.target.style.boxShadow = '0 0 0 3px rgba(255,107,53,0.12)'; }}
                  onBlur={e  => { e.target.style.borderColor = error ? '#ff4d4d' : '#2e2e3a'; e.target.style.boxShadow = ''; }}
                />
                {/* Toggle visibilità password */}
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors duration-200 hover:text-[#FF6B35] text-pink-400"
                  tabIndex={-1}
                >
                  <FontAwesomeIcon icon={showPwd ? faEyeSlash : faEye} className="text-sm" />
                </button>
              </div>
            </div>

            {/* Errore */}
            {error && (
              <div
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-mono"
                style={{
                  background: 'rgba(255,77,77,0.08)',
                  border: '1px solid rgba(255,77,77,0.25)',
                  color: '#ff4d4d'
                }}
              >
                <span>⚠</span>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full flex items-center justify-center gap-2
                py-4 rounded-xl font-bold text-white text-sm
                transition-all duration-200
                disabled:opacity-60 disabled:cursor-not-allowed
                hover:-translate-y-0.5
              "
              style={{
                background: 'linear-gradient(135deg, #FF6B35, #FF4D8D)',
                boxShadow: '0 4px 20px rgba(255,107,53,0.3)',
                marginTop: '8px',
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.boxShadow = '0 8px 28px rgba(255,107,53,0.45)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,107,53,0.3)'; }}
            >
              {loading ? (
                <>
                  <span
                    className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"
                  />
                  Accesso in corso…
                </>
              ) : (
                <>
                  Entra nella dashboard
                  <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                </>
              )}
            </button>

          </form>

          {/* Footer card */}
          <p
            className="text-center text-[0.72rem] mt-8 font-mono"
            style={{ color: '#3a3a4a' }}
          >
            Accesso riservato agli amministratori di ColoraBoom!
          </p>

        </div>

        {/* Link torna al sito */}
        <p className="text-center mt-5 text-sm" style={{ color: '#7a7a9a' }}>
          ←{' '}
          <a
            href="/"
            className="hover:text-[#FF6B35] transition-colors duration-200 font-semibold"
            style={{ color: '#7a7a9a' }}
          >
            Torna al sito pubblico
          </a>
        </p>

      </div>
    </div>
  );
}