import React from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import PWAInstallPrompt from './components/PWAInstallPrompt'
import { useScrollNavbar } from './hooks/useScrollNavbar'
import { useMobileDrawer } from './hooks/useMobileDrawer'
import { cn } from './utils/cn'
import { useApp } from './store/appStore.tsx'

const publicNavLinks = [
  { label: 'Features', href: '/#features', isRoute: false },
  { label: 'Benefits', href: '/#benefits', isRoute: false },
  { label: 'Services', href: '/#services', isRoute: false },
]

const appNavLinks = [
  { label: 'Dashboard', href: '/dashboard', isRoute: true },
  { label: 'Patients', href: '/records', isRoute: true },
  { label: 'Appointments', href: '/appointments', isRoute: true },
  { label: 'Schedule', href: '/schedule', isRoute: true },
  { label: 'Cycle', href: '/cycle', isRoute: true },
  { label: 'Inventory', href: '/inventory', isRoute: true },
  { label: 'Analytics', href: '/analytics', isRoute: true },
]

const patientNavLinks = [
  { label: 'My Dashboard', href: '/dashboard', isRoute: true },
  { label: 'My Diet Plan', href: '/diet', isRoute: true },
  { label: 'Appointments', href: '/appointments', isRoute: true },
]

const footerColumns = [
  {
    heading: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#' },
      { label: 'Demo', href: '/schedule' },
      { label: 'Changelog', href: '#' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Case Studies', href: '#' },
      { label: 'API', href: '#' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Security', href: '#' },
      { label: 'Cookies', href: '#' },
    ],
  },
]

function MenuIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

export default function App() {
  const { isScrolled } = useScrollNavbar(20)
  const { isOpen, toggle, close } = useMobileDrawer()
  const location = useLocation()
  const navigate = useNavigate()
  const { state, logout } = useApp()
  const { currentUser } = state

  const isAppRoute = location.pathname !== '/' && location.pathname !== '/login'
  const navLinks = isAppRoute
    ? (currentUser?.role === 'patient' ? patientNavLinks : appNavLinks)
    : publicNavLinks

  React.useEffect(() => { close() }, [location.pathname, close])

  return (
    <div className="min-h-screen flex flex-col">

      {/* ── Navbar ───────────────────────────────────────────── */}
      <header className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        isScrolled || isAppRoute
          ? 'bg-white/90 backdrop-blur-lg shadow-sm border-b border-amber-100/60'
          : 'bg-transparent'
      )}>
        <div className="container-wide h-16 flex items-center justify-between">
          <Link to={currentUser ? '/dashboard' : '/'} className="font-serif text-xl font-bold text-amber-800 tracking-tight">
            AyurSutra
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-4 text-sm">
            {navLinks.map(link => (
              link.isRoute ? (
                <Link key={link.label} to={link.href}
                  className={cn('font-medium transition-colors relative pb-0.5',
                    location.pathname === link.href ? 'text-amber-600' :
                    isScrolled || isAppRoute ? 'text-gray-600 hover:text-amber-800' : 'text-white/80 hover:text-white'
                  )}>
                  {link.label}
                </Link>
              ) : (
                <a key={link.label} href={link.href}
                  className={cn('font-medium transition-colors relative pb-0.5',
                    isScrolled ? 'text-gray-600 hover:text-amber-800' : 'text-white/80 hover:text-white'
                  )}>
                  {link.label}
                </a>
              )
            ))}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 hidden lg:block">{currentUser.name}</span>
                <button onClick={() => { logout(); navigate('/') }} className="btn-outline-amber text-xs py-1.5 px-3">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn-primary text-sm">Login</Link>
            )}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={toggle}
            className={cn(
              'md:hidden p-2 rounded-lg transition-colors',
              isScrolled || isAppRoute ? 'text-gray-700 hover:bg-amber-50' : 'text-white hover:bg-white/10'
            )}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </header>

      {/* ── Mobile Drawer ─────────────────────────────────────── */}
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={close}
      />
      {/* Drawer panel */}
      <div className={cn(
        'fixed top-0 right-0 h-full w-72 z-50 bg-white shadow-2xl transition-transform duration-300 ease-in-out md:hidden flex flex-col',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}>
        <div className="flex items-center justify-between px-6 h-16 border-b border-gray-100">
          <span className="font-serif text-lg font-bold text-amber-800">AyurSutra</span>
          <button onClick={close} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
            <XIcon />
          </button>
        </div>
        <nav className="flex-1 px-6 py-6 space-y-1">
          {navLinks.map(link => (
            link.isRoute ? (
              <Link key={link.label} to={link.href} onClick={close}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-amber-50 hover:text-amber-800 font-medium transition-colors">
                {link.label}
              </Link>
            ) : (
              <a key={link.label} href={link.href} onClick={close}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-amber-50 hover:text-amber-800 font-medium transition-colors">
                {link.label}
              </a>
            )
          ))}
          <div className="pt-4">
            {currentUser ? (
              <button onClick={() => { logout(); navigate('/'); close() }} className="btn-outline-amber w-full justify-center">
                Logout ({currentUser.name})
              </button>
            ) : (
              <Link to="/login" onClick={close} className="btn-primary w-full justify-center">Login</Link>
            )}
          </div>
        </nav>
      </div>

      {/* ── Page Content ─────────────────────────────────────── */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer style={{ background: '#1c0a00' }} className="text-amber-100/80">
        {/* Amber gradient top border */}
        <div className="h-px bg-gradient-to-r from-transparent via-amber-600/60 to-transparent" />

        <div className="container-wide pt-14 pb-10">
          {/* Top row */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-12">
            <div className="max-w-xs">
              <Link to="/" className="font-serif text-2xl font-bold text-amber-300 tracking-tight">
                AyurSutra
              </Link>
              <p className="mt-2 text-sm text-amber-100/60 leading-relaxed">
                The professional platform for Panchakarma patient management and therapy scheduling.
              </p>
            </div>
            {/* Newsletter */}
            <div className="max-w-sm w-full">
              <p className="text-sm font-semibold text-amber-200 mb-2">Stay updated</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 rounded-lg bg-white/10 border border-white/15 px-3 py-2 text-sm text-white placeholder-white/30 outline-none focus:border-amber-500/60 transition-colors"
                />
                <button className="btn-primary text-sm shrink-0">Subscribe</button>
              </div>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {footerColumns.map(col => (
              <div key={col.heading}>
                <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-4">
                  {col.heading}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map(link => (
                    <li key={link.label}>
                      <a href={link.href} className="text-sm text-amber-100/50 hover:text-amber-200 transition-colors">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom row */}
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-amber-100/40">
              © {new Date().getFullYear()} AyurSutra. All rights reserved.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-4">
              {/* Twitter/X */}
              <a href="#" aria-label="Twitter" className="text-amber-100/40 hover:text-amber-300 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" aria-label="LinkedIn" className="text-amber-100/40 hover:text-amber-300 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              {/* GitHub */}
              <a href="#" aria-label="GitHub" className="text-amber-100/40 hover:text-amber-300 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      <PWAInstallPrompt />
    </div>
  )
}
