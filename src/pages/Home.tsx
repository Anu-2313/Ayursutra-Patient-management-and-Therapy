import React from 'react'
import { Link } from 'react-router-dom'
import FeatureCard from '../components/FeatureCard'

const trustStats = [
  { value: '500+', label: 'Ayurvedic Centers' },
  { value: '94%', label: 'Therapy Accuracy' },
  { value: '40%', label: 'Less Admin Work' },
  { value: '4.9★', label: 'Practitioner Rating' },
]

const features = [
  {
    icon: '🗓️',
    title: 'Automated Scheduling',
    desc: 'Streamline therapy bookings while preserving Ayurvedic protocols and practitioner preferences.',
  },
  {
    icon: '📋',
    title: 'Patient Tracking',
    desc: 'Maintain detailed patient histories, dosha profiles, and treatment progress in one place.',
  },
  {
    icon: '📚',
    title: 'Protocols Library',
    desc: 'Access a curated library of traditional Panchakarma protocols for consistent care delivery.',
  },
]

const services = [
  {
    icon: '⚕️',
    title: 'Automated Therapy & Records',
    desc: 'Centralized digital health records with AI-powered therapy scheduling.',
    link: '/schedule',
    cta: 'Try Scheduling Demo',
    accentColor: 'amber' as const,
  },
  {
    icon: '🥗',
    title: 'AI Diet Planner',
    desc: 'Personalized meal suggestions aligned to dosha type and nutritional needs.',
    link: '/diet',
    cta: 'Try Diet Demo',
    accentColor: 'forest' as const,
  },
  {
    icon: '📊',
    title: 'Operational Efficiency',
    desc: 'Intelligent scheduling, automated reminders, and actionable insights to enhance care.',
    link: '/records',
    cta: 'View Records Demo',
    accentColor: 'blue' as const,
  },
]

const stakeholders = [
  {
    role: 'For Practitioners',
    stat: '40% less admin work',
    points: [
      'Streamlined daily schedule management',
      'Integrated patient consultation tools',
      'Access to traditional protocol library',
      'Performance analytics and insights',
    ],
  },
  {
    role: 'For Patients',
    stat: '50% better compliance',
    points: [
      'Easy appointment booking and modification',
      'Personalized health tips and guidance',
      'Real-time therapy progress tracking',
      'Automated care reminders and notifications',
    ],
  },
  {
    role: 'For Administrators',
    stat: '60% fewer admin tasks',
    points: [
      'Comprehensive center performance metrics',
      'Staff scheduling and resource optimization',
      'Revenue tracking and billing integration',
      'Regulatory compliance reporting',
    ],
  },
]

export default function Home() {
  return (
    <div className="overflow-x-hidden">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center isolate overflow-hidden">
        <div
          className="absolute inset-0 bg-center bg-cover z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2000&auto=format&fit=crop')",
            backgroundColor: '#78350f',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-amber-950/60 to-transparent z-0" />

        {/* Decorative orbs */}
        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl z-0 pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full bg-orange-400/8 blur-3xl z-0 pointer-events-none" />

        <div className="relative z-10 container-wide py-28">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 text-xs font-semibold text-amber-200 tracking-widest uppercase mb-6">
              ✦ Ayurvedic Intelligence
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
              Panchakarma <br />
              <span className="text-amber-300">Patient Management</span><br />
              <span className="text-white/90">& Therapy Scheduling</span>
            </h1>
            <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-xl">
              Automate scheduling, track patient progress, and preserve Ayurvedic authenticity with a comprehensive, professional system.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#benefits" className="btn-primary">See Benefits</a>
              <a href="#features" className="btn-outline">Explore Features</a>
              <Link to="/login" className="inline-flex items-center rounded-lg bg-white px-5 py-2.5 text-amber-800 font-semibold hover:bg-amber-50 shadow-md transition-all hover:-translate-y-0.5 text-sm">
                Login →
              </Link>
            </div>

            {/* Trust stats row */}
            <div className="mt-12 inline-flex flex-wrap gap-0 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 overflow-hidden">
              {trustStats.map((s, i) => (
                <div key={s.label} className={`px-5 py-3.5 text-center ${i < trustStats.length - 1 ? 'border-r border-white/15' : ''}`}>
                  <div className="text-xl font-bold text-amber-300 font-serif">{s.value}</div>
                  <div className="text-xs text-white/60 mt-0.5 whitespace-nowrap">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#fafaf8] to-transparent z-10 pointer-events-none" />
      </section>

      {/* ── Features ─────────────────────────────────────────── */}
      <section id="features" className="py-24">
        <div className="container-wide">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="stat-badge mb-3">Core Features</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mt-3">
              Everything you need to run a modern Ayurvedic center
            </h2>
          </div>
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <FeatureCard
                key={f.title}
                icon={f.icon}
                title={f.title}
                description={f.desc}
                variant="default"
                accentColor="amber"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits ─────────────────────────────────────────── */}
      <section id="benefits" className="py-24 bg-gradient-to-b from-[#fafaf8] to-amber-50/40">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="stat-badge mb-3">Who Benefits</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mt-3">
              Designed for every stakeholder in the Panchakarma ecosystem
            </h2>
            <p className="mt-3 text-gray-500">From practitioners to patients to administrators.</p>
          </div>
          <div className="grid gap-7 md:grid-cols-3">
            {stakeholders.map((s) => (
              <FeatureCard
                key={s.role}
                icon={s.role === 'For Practitioners' ? '🩺' : s.role === 'For Patients' ? '🌿' : '📈'}
                title={s.role}
                description=""
                variant="default"
                accentColor="amber"
                badge={s.stat}
              >
                <ul className="space-y-2.5 mt-1">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <span className="mt-0.5 text-amber-500 shrink-0 font-bold">✓</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </FeatureCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────── */}
      <section id="services" className="py-24 bg-white">
        <div className="container-wide">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="stat-badge mb-3">Our Services</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mt-3">
              Explore what AyurSutra can do
            </h2>
          </div>
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <FeatureCard
                key={s.title}
                icon={s.icon}
                title={s.title}
                description={s.desc}
                variant="gradient"
                accentColor={s.accentColor}
                link={{ href: s.link, label: s.cta }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-800 via-amber-700 to-orange-700 z-0" />
        <div className="absolute inset-0 opacity-10 z-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
        <div className="relative z-10 container-wide flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">See AyurSutra in action</h2>
            <p className="mt-2 text-amber-100/80 text-lg">Request a walkthrough tailored to your center.</p>
          </div>
          <Link to="/login" className="inline-flex items-center rounded-xl bg-white px-8 py-4 text-amber-800 font-semibold hover:bg-amber-50 shadow-lg transition-all hover:-translate-y-0.5 shrink-0 text-base">
            Get Started →
          </Link>
        </div>
      </section>

    </div>
  )
}
