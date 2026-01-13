import React from 'react'

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden min-h-[70vh] isolate">
        <div
          className="absolute inset-0 bg-center bg-cover z-0 pointer-events-none"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2000&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70 z-0 pointer-events-none" />
        <div className="relative z-10">
          <div className="container-wide pt-24 pb-20">
            <div className="max-w-3xl text-white">
              <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white">AyurSutra</span>
              <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">Panchakarma Patient Management & Therapy Scheduling</h1>
              <p className="mt-4 text-lg text-white/80">Automate scheduling, track patient progress, and preserve Ayurvedic authenticity with a comprehensive, professional system.</p>
              <div className="mt-8 flex flex-wrap sm:flex-nowrap items-center gap-3 gap-y-3">
                <a href="#benefits" className="btn-primary w-full sm:w-auto justify-center">See Benefits</a>
                <a href="#features" className="inline-flex items-center rounded-md bg-white/10 ring-1 ring-white/20 px-5 py-2.5 text-white font-medium hover:bg-white/20 w-full sm:w-auto justify-center text-center">Explore Features</a>
                <a href="/login" className="inline-flex items-center rounded-md bg-white px-5 py-2.5 text-brand-700 font-medium hover:bg-brand-50 shadow-sm w-full sm:w-auto justify-center text-center">Login →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-16 relative z-10">
        <div className="container-wide">
          <h2 className="text-2xl font-semibold text-gray-900">Key Features</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {["Automated Scheduling","Patient Tracking","Protocols Library"].map((t) => (
              <div key={t} className="rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900">{t}</h3>
                <p className="mt-2 text-sm text-gray-600">Streamline operations while preserving Ayurvedic protocols.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="benefits" className="py-20 bg-gradient-to-b from-white to-brand-50/40 relative z-10">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Designed to benefit every stakeholder in the Panchakarma ecosystem</h2>
            <p className="mt-2 text-gray-600">From practitioners to patients to administrators.</p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-brand-700">For Practitioners</h3>
              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                <li className="flex gap-2"><span className="text-brand-600">•</span> Streamlined daily schedule management</li>
                <li className="flex gap-2"><span className="text-brand-600">•</span> Integrated patient consultation tools</li>
                <li className="flex gap-2"><span className="text-brand-600">•</span> Access to traditional protocol library</li>
                <li className="flex gap-2"><span className="text-brand-600">•</span> Performance analytics and insights</li>
                <li className="flex gap-2 font-medium text-gray-900"><span className="text-brand-600">•</span> Reduced administrative workload by 40%</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-brand-700">For Patients</h3>
              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                <li className="flex gap-2"><span className="text-brand-600">•</span> Easy appointment booking and modification</li>
                <li className="flex gap-2"><span className="text-brand-600">•</span> Personalized health tips and guidance</li>
                <li className="flex gap-2"><span className="text-brand-600">•</span> Real-time therapy progress tracking</li>
                <li className="flex gap-2"><span className="text-brand-600">•</span> Automated care reminders and notifications</li>
                <li className="flex gap-2 font-medium text-gray-900"><span className="text-brand-600">•</span> 50% improvement in treatment compliance</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-brand-700">For Administrators</h3>
              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                <li className="flex gap-2"><span className="text-brand-600">•</span> Comprehensive center performance metrics</li>
                <li className="flex gap-2"><span className="text-brand-600">•</span> Staff scheduling and resource optimization</li>
                <li className="flex gap-2"><span className="text-brand-600">•</span> Revenue tracking and billing integration</li>
                <li className="flex gap-2"><span className="text-brand-600">•</span> Regulatory compliance reporting</li>
                <li className="flex gap-2 font-medium text-gray-900"><span className="text-brand-600">•</span> 60% reduction in administrative tasks</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="outcomes" className="py-16 bg-white relative z-10">
        <div className="container-wide">
          <h2 className="text-2xl font-semibold text-gray-900">Our Services</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">Automated Therapy & Records</h3>
              <p className="mt-2 text-sm text-gray-600">Centralized digital health records with therapy scheduling.</p>
              <div className="mt-4">
                <a href="/schedule" className="btn-primary">Try scheduling demo</a>
              </div>
            </div>
            <div className="rounded-xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">AI Diet Planner</h3>
              <p className="mt-2 text-sm text-gray-600">Personalized meal suggestions aligned to dosha and nutrition.</p>
              <div className="mt-4">
                <a href="/diet" className="btn-primary">Try diet demo</a>
              </div>
            </div>
            <div className="rounded-xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">Operational Efficiency</h3>
              <p className="mt-2 text-sm text-gray-600">Intelligent scheduling, reminders, and insights to enhance care.</p>
              <div className="mt-4">
                <a href="/records" className="btn-primary">View records demo</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-20 py-16 bg-brand-600 text-white">
        <div className="container-wide flex flex-col md:flex-row items-center md:items-center justify-between gap-6">
          <div className="w-full md:w-auto">
            <h2 className="text-2xl font-semibold">See AyurSutra in action</h2>
            <p className="mt-1 text-brand-100">Request a walkthrough tailored to your center.</p>
          </div>
          <a href="/login" className="inline-flex items-center rounded-md bg-white px-5 py-3 text-brand-700 font-medium hover:bg-brand-50 shadow-sm w-full md:w-auto justify-center">Login</a>
        </div>
      </section>
    </div>
  )
}

