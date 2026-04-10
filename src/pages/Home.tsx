import React from 'react'
import { Link } from 'react-router-dom'

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
    color: 'from-amber-50 to-orange-50',
    border: 'border-amber-100',
  },
  {
    icon: '🥗',
    title: 'AI Diet Planner',
    desc: 'Personalized meal suggestions aligned to dosha type and nutritional needs.',
    link: '/diet',
    cta: 'Try Diet Demo',
    color: 'from-green-50 to-emerald-50',
    border: 'border-green-100',
  },
  {
    icon: '📊',
    title: 'Operational Efficiency',
    desc: 'Intelligent scheduling, automated reminders, and actionable insights to enhance care.',
    link: '/records',
    cta: 'View Records Demo',
    color: 'from-blue-50 to-indigo-50',
    border: 'border-blue-100',
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

      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-center isolate overflow-hidden">
        <div
          className="absolute inset-0 bg-center bg-cover z-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2000&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/55 to-amber-950/60 z-0" />

        {/* Decorative orb */}
        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl z-0 pointer-events-none" />

        <div className="relative z-10 container-wide py-24">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 text-xs font-semibold text-amber-200 tracking-widest uppercase mb-6">
              ✦ Ayurvedic Intelligence
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl font-bold text-white leading-tight tracking-tight">
              Panchakarma <br />
              <span className="text-amber-300">Patient Management</span><br />
              & Therapy Scheduling
            </h1>
            <p className="mt-6 text-lg text-white/75 leading-relaxed max-w-xl">
              Automate scheduling, track patient progress, and preserve Ayurvedic authenticity with a comprehensive, professional system.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#benefits" className="btn-primary">See Benefits</a>
              <a href="#features" className="btn-outline">Explore Features</a>
              <Link to="/login" className="inline-flex items-center rounded-lg bg-white px-5 py-2.5 text-amber-800 font-semibold hover:bg-amber-50 shadow-md transition-all hover:-translate-y-0.5 text-sm">
                Login →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#fafaf8] to-transparent z-10 pointer-events-none" />
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="container-wide">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="stat-badge mb-3">Core Features</span>
            <h2 className="font-serif text-3xl font-bold text-gray-900 mt-2">Everything you need to run a modern Ayurvedic center</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="card p-7">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900">{f.title}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-20 bg-gradient-to-b from-[#fafaf8] to-amber-50/40">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="stat-badge mb-3">Who Benefits</span>
            <h2 className="font-serif text-3xl font-bold text-gray-900 mt-2">Designed for every stakeholder in the Panchakarma ecosystem</h2>
            <p className="mt-3 text-gray-500">From practitioners to patients to administrators.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {stakeholders.map((s) => (
              <div key={s.role} className="card p-7">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-semibold text-gray-900">{s.role}</h3>
                  <span className="stat-badge">{s.stat}</span>
                </div>
                <ul className="space-y-3">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <span className="mt-0.5 text-amber-500 shrink-0">✓</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-white">
        <div className="container-wide">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="stat-badge mb-3">Our Services</span>
            <h2 className="font-serif text-3xl font-bold text-gray-900 mt-2">Explore what AyurSutra can do</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div key={s.title} className={`card p-7 bg-gradient-to-br ${s.color} border ${s.border}`}>
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900">{s.title}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                <div className="mt-6">
                  <Link to={s.link} className="btn-primary text-sm">{s.cta}</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-800 via-amber-700 to-orange-700 z-0" />
        <div className="absolute inset-0 opacity-10 z-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="relative z-10 container-wide flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-serif text-3xl font-bold text-white">See AyurSutra in action</h2>
            <p className="mt-2 text-amber-100/80">Request a walkthrough tailored to your center.</p>
          </div>
          <Link to="/login" className="inline-flex items-center rounded-lg bg-white px-7 py-3.5 text-amber-800 font-semibold hover:bg-amber-50 shadow-lg transition-all hover:-translate-y-0.5 shrink-0">
            Get Started →
          </Link>
        </div>
      </section>

    </div>
  )
}
