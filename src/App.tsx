import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import PWAInstallPrompt from './components/PWAInstallPrompt'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 border-b border-amber-100/60 bg-white/85 backdrop-blur-md supports-[backdrop-filter]:bg-white/70 shadow-sm">
        <div className="container-wide h-16 flex items-center justify-between">
          <Link to="/" className="font-serif text-xl font-bold text-amber-800 tracking-tight">AyurSutra</Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a href="#features" className="hover:text-amber-800 transition-colors font-medium">Features</a>
            <a href="#benefits" className="hover:text-amber-800 transition-colors font-medium">Benefits</a>
            <a href="#services" className="hover:text-amber-800 transition-colors font-medium">Services</a>
            <Link to="/login" className="btn-primary text-sm">Login</Link>
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
      <PWAInstallPrompt />
    </div>
  )
}