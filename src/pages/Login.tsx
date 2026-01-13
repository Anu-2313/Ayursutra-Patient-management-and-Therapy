import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    navigate('/schedule')
  }
  return (
    <div className="min-h-[70vh] flex items-center">
      <div className="container-wide">
        <div className="mx-auto max-w-md rounded-2xl border border-gray-100 p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-gray-900">Login</h1>
          <p className="mt-1 text-sm text-gray-600">Access your AyurSutra dashboard</p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input id="email" type="email" className="mt-1 w-full rounded-md border-gray-300 focus:border-brand-600 focus:ring-brand-600" placeholder="you@example.com" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input id="password" type="password" className="mt-1 w-full rounded-md border-gray-300 focus:border-brand-600 focus:ring-brand-600" placeholder="••••••••" />
            </div>
            <button type="submit" className="btn-primary w-full justify-center">Sign in</button>
          </form>
          <p className="mt-4 text-xs text-gray-500">By continuing you agree to our Terms and Privacy Policy.</p>
        </div>
      </div>
    </div>
  )
}
