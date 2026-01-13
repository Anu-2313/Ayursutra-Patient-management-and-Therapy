import React from 'react'
import { Outlet, Link } from 'react-router-dom'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container-wide h-16 flex items-center justify-between">
          <Link to="/" className="text-lg font-semibold text-gray-900">AyurSutra</Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a href="#features" className="hover:text-gray-900">Features</a>
            <Link to="/login" className="btn-primary">Login</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-gray-100 py-10 text-sm text-gray-600">
        <div className="container-wide flex items-center justify-between">
          <p>© {new Date().getFullYear()} AyurSutra</p>
          <div className="flex items-center gap-4">
            <a className="link" href="#">Privacy</a>
            <a className="link" href="#">Terms</a>
            <a className="link" href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
