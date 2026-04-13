import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import FormField from '../components/FormField'
import { useApp } from '../store/appStore.tsx'

// Demo credentials — role-based access
const DEMO_USERS = [
  { email: 'admin@ayursutra.com',     password: 'admin123',   name: 'Dr. Krishnarao', role: 'admin' as const,        patientId: undefined },
  { email: 'doctor@ayursutra.com',    password: 'doctor123',  name: 'Dr. Priya Nair', role: 'practitioner' as const, patientId: undefined },
  { email: 'therapist@ayursutra.com', password: 'therapy123', name: 'Kavita Sharma',  role: 'therapist' as const,    patientId: undefined },
  { email: 'patient@ayursutra.com',   password: 'patient123', name: 'Ananya Verma',   role: 'patient' as const,      patientId: 'PAT-A1B2C' },
]

const ROLE_COLORS: Record<string, string> = {
  admin:        'bg-purple-100 text-purple-700 border-purple-200',
  practitioner: 'bg-amber-100 text-amber-700 border-amber-200',
  therapist:    'bg-green-100 text-green-700 border-green-200',
  patient:      'bg-blue-100 text-blue-700 border-blue-200',
}

const ROLE_ICONS: Record<string, string> = {
  admin: '🏥', practitioner: '🩺', therapist: '💆', patient: '🌿',
}

export default function Login() {
  const navigate = useNavigate()
  const { login } = useApp()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(false)
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    setTimeout(() => {
      const user = DEMO_USERS.find(u => u.email === email && u.password === password)
      if (user) {
        login(user.name, user.role, user.patientId)
        navigate('/dashboard')
      } else {
        setError('Invalid email or password. Use demo credentials below.')
      }
      setLoading(false)
    }, 600)
  }

  function loginAs(u: typeof DEMO_USERS[0]) {
    setEmail(u.email)
    setPassword(u.password)
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-stretch">
      {/* Left panel */}
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden flex-col justify-between p-12"
           style={{ background: 'linear-gradient(145deg, #78350f 0%, #92400e 40%, #b45309 100%)' }}>
        <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-64 h-64 rounded-full bg-orange-300/10 blur-3xl pointer-events-none" />
        <Link to="/" className="font-serif text-2xl font-bold text-white tracking-tight relative z-10">AyurSutra</Link>
        <div className="relative z-10">
          <svg className="w-10 h-10 text-amber-300/40 mb-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
          </svg>
          <blockquote className="font-display text-2xl font-semibold text-white/90 leading-relaxed">
            "The natural healing force within each of us is the greatest force in getting well."
          </blockquote>
          <p className="mt-4 text-amber-200/70 text-sm font-medium">— Hippocrates</p>
        </div>
        <div className="relative z-10 flex flex-wrap gap-3">
          {['500+ Centers', '94% Accuracy', '4.9★ Rating'].map(badge => (
            <span key={badge} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-3 py-1.5 text-xs font-semibold text-amber-100 backdrop-blur-sm">
              ✦ {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-[#fafaf8]">
        <div className="w-full max-w-md">
          <Link to="/" className="md:hidden font-serif text-xl font-bold text-amber-800 tracking-tight block mb-8">AyurSutra</Link>

          <div className="mb-8">
            <h1 className="font-serif text-3xl font-bold text-gray-900">Welcome back</h1>
            <p className="mt-2 text-sm text-gray-500">Sign in to access your AyurSutra dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <FormField id="email" label="Email address" type="email" value={email}
              onChange={setEmail} placeholder="you@ayursutra.com" required />

            <div>
              <div className="relative">
                <FormField id="password" label="Password" type={showPassword ? 'text' : 'password'}
                  value={password} onChange={setPassword} placeholder="••••••••" required />
                <button type="button" onClick={() => setShowPassword(p => !p)}
                  className="absolute right-3 top-[2.15rem] text-neutral-400 hover:text-neutral-600 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}>
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-xs text-red-700">{error}</div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center text-center mt-2 disabled:opacity-60">
              {loading ? 'Signing in...' : 'Sign in →'}
            </button>
          </form>

          {/* Demo credentials */}
          <div className="mt-6 rounded-xl bg-amber-50 border border-amber-100 p-4">
            <p className="text-xs font-semibold text-amber-800 mb-3">Demo Credentials — click to auto-fill</p>
            <div className="grid grid-cols-2 gap-2">
              {DEMO_USERS.map(u => (
                <button key={u.email} onClick={() => loginAs(u)}
                  className={`text-left rounded-xl border px-3 py-2.5 text-xs hover:shadow-sm transition-all bg-white ${ROLE_COLORS[u.role]}`}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span>{ROLE_ICONS[u.role]}</span>
                    <span className="font-bold capitalize">{u.role}</span>
                  </div>
                  <p className="text-gray-500 truncate">{u.email}</p>
                  <p className="text-gray-400 text-[10px] mt-0.5">pw: {u.password}</p>
                </button>
              ))}
            </div>
          </div>

          <p className="mt-4 text-xs text-gray-400 text-center">
            By continuing you agree to our{' '}
            <a href="#" className="text-amber-700 hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-amber-700 hover:underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  )
}
