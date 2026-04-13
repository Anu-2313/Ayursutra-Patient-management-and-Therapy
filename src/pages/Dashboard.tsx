import React from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../store/appStore.tsx'
import PatientPortal from './PatientPortal'
// ── Shared helpers ────────────────────────────────────────────────────────────

function StatCard({ label, value, sub, color }: { label: string; value: string | number; sub?: string; color: string }) {
  return (
    <div className={`rounded-2xl border bg-white p-5 shadow-card border-l-4 ${color}`}>
      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{label}</p>
      <p className="font-serif text-3xl font-bold text-gray-900 mt-1">{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  )
}

const statusColors: Record<string, string> = {
  'scheduled':   'bg-blue-100 text-blue-700',
  'in-progress': 'bg-amber-100 text-amber-700',
  'completed':   'bg-green-100 text-green-700',
  'cancelled':   'bg-gray-100 text-gray-500',
}

function AptRow({ apt, onStart, onComplete, onCancel }: {
  apt: any
  onStart?: () => void
  onComplete?: () => void
  onCancel?: () => void
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-100 p-3 hover:bg-amber-50/30 transition-colors">
      <div className="text-center min-w-[48px]">
        <p className="text-sm font-bold text-gray-900">{apt.time}</p>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-semibold text-gray-900 text-sm truncate">{apt.patientName}</p>
          <span className={`text-xs rounded-full px-2 py-0.5 font-medium ${statusColors[apt.status]}`}>{apt.status}</span>
        </div>
        <p className="text-xs text-gray-500">{apt.therapy} · {apt.therapistName} · {apt.roomName}</p>
        <div className="flex gap-1 mt-1 flex-wrap">
          <span className="text-xs bg-amber-50 text-amber-700 rounded px-1.5 py-0.5">{apt.prakriti}</span>
          <span className="text-xs bg-blue-50 text-blue-700 rounded px-1.5 py-0.5">{apt.agni}</span>
          <span className="text-xs bg-purple-50 text-purple-700 rounded px-1.5 py-0.5">{apt.koshta}</span>
        </div>
      </div>
      <div className="flex gap-1 shrink-0">
        {apt.status === 'scheduled' && onStart && (
          <button onClick={onStart} className="text-xs bg-amber-100 text-amber-800 rounded-lg px-2 py-1 hover:bg-amber-200 font-medium">Start</button>
        )}
        {apt.status === 'in-progress' && onComplete && (
          <button onClick={onComplete} className="text-xs bg-green-100 text-green-800 rounded-lg px-2 py-1 hover:bg-green-200 font-medium">Done</button>
        )}
        {apt.status !== 'completed' && apt.status !== 'cancelled' && onCancel && (
          <button onClick={onCancel} className="text-xs bg-red-50 text-red-600 rounded-lg px-2 py-1 hover:bg-red-100 font-medium">Cancel</button>
        )}
      </div>
    </div>
  )
}

// ── ADMIN DASHBOARD ───────────────────────────────────────────────────────────
// Full center overview: all metrics, staff, inventory, analytics, safety alerts

function AdminDashboard() {
  const { state, updateAppointmentStatus, cancelAppointment } = useApp()
  const { patients, appointments, therapists, rooms, inventory, currentUser } = state

  const today = new Date().toISOString().slice(0, 10)
  const todayApts = appointments.filter(a => a.date === today && a.status !== 'cancelled')
  const completedToday = appointments.filter(a => a.date === today && a.status === 'completed').length
  const lowStock = inventory.filter(i => i.currentStock <= i.reorderLevel)
  const availableTherapists = therapists.filter(t => t.available)
  const availableRooms = rooms.filter(r => r.available)
  const utilizationRate = rooms.length > 0
    ? Math.round(((rooms.length - availableRooms.length) / rooms.length) * 100) : 0

  const safetyAlerts = appointments.filter(a =>
    a.status !== 'cancelled' && (
      (a.koshta === 'Mrudu' && a.therapy === 'Virechana') ||
      (a.agni === 'Manda' && (a.therapy === 'Snehapana' || a.therapy === 'Abhyanga'))
    )
  )

  // Revenue proxy: completed sessions
  const totalCompleted = appointments.filter(a => a.status === 'completed').length
  const cancelRate = appointments.length > 0
    ? Math.round((appointments.filter(a => a.status === 'cancelled').length / appointments.length) * 100) : 0

  return (
    <div className="min-h-[70vh] bg-[#fafaf8]">
      <div className="container-wide py-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold bg-purple-100 text-purple-700 rounded-full px-2.5 py-0.5 uppercase tracking-wider">Admin</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-gray-900">Admin Control Center</h1>
            <p className="text-sm text-gray-500 mt-1">
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link to="/register" className="btn-primary text-sm">+ Register Patient</Link>
            <Link to="/staff" className="btn-outline-amber text-sm">Manage Staff</Link>
            <Link to="/analytics" className="btn-outline-amber text-sm">Analytics</Link>
          </div>
        </div>

        {/* Safety alerts */}
        {safetyAlerts.length > 0 && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-bold text-red-800 mb-2">🚨 Active Safety Alerts — Requires Admin Review</p>
            {safetyAlerts.map(a => (
              <p key={a.id} className="text-xs text-red-700">
                <strong>{a.patientName}</strong> — {a.therapy} with {a.koshta} Koshta / {a.agni} Agni. Review before proceeding.
              </p>
            ))}
          </div>
        )}

        {/* Low stock */}
        {lowStock.length > 0 && (
          <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm font-bold text-amber-800 mb-2">⚠️ Low Inventory — Procurement Required</p>
            <div className="flex flex-wrap gap-2">
              {lowStock.map(i => (
                <span key={i.id} className="text-xs bg-white border border-amber-200 rounded-full px-2.5 py-1 text-amber-800">
                  {i.name}: {i.currentStock}{i.unit}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* KPI stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard label="Today's Sessions" value={todayApts.length} sub={`${completedToday} completed`} color="border-l-amber-500" />
          <StatCard label="Total Patients" value={patients.length} sub="Registered LPRs" color="border-l-blue-500" />
          <StatCard label="Staff Available" value={`${availableTherapists.length}/${therapists.length}`} sub="Therapists on shift" color="border-l-green-500" />
          <StatCard label="Room Utilization" value={`${utilizationRate}%`} sub={`${availableRooms.length} rooms free`} color="border-l-purple-500" />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Today's schedule */}
          <div className="lg:col-span-2 rounded-2xl border border-gray-100 border-t-4 border-t-amber-500 bg-white p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-lg font-bold text-gray-900">All Today's Appointments</h2>
              <Link to="/appointments" className="text-xs text-amber-700 font-semibold">Full view →</Link>
            </div>
            {todayApts.length === 0 ? (
              <p className="text-sm text-gray-400 py-8 text-center">No appointments today</p>
            ) : (
              <div className="space-y-3">
                {todayApts.map(apt => (
                  <AptRow key={apt.id} apt={apt}
                    onStart={() => updateAppointmentStatus(apt.id, 'in-progress')}
                    onComplete={() => updateAppointmentStatus(apt.id, 'completed')}
                    onCancel={() => cancelAppointment(apt.id)} />
                ))}
              </div>
            )}
          </div>

          {/* Right column */}
          <div className="space-y-5">
            {/* Center metrics */}
            <div className="rounded-2xl border border-gray-100 border-t-4 border-t-purple-500 bg-white p-5 shadow-card">
              <h2 className="font-serif text-base font-bold text-gray-900 mb-3">Center Metrics</h2>
              <div className="space-y-2 text-sm">
                {[
                  { label: 'Total Sessions', value: appointments.length },
                  { label: 'Completed', value: totalCompleted },
                  { label: 'Cancellation Rate', value: `${cancelRate}%` },
                  { label: 'Admin Time Saved', value: '88%' },
                  { label: 'SIT Reduction', value: '40%' },
                ].map(m => (
                  <div key={m.label} className="flex justify-between">
                    <span className="text-gray-500">{m.label}</span>
                    <span className="font-semibold text-gray-900">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Staff roster */}
            <div className="rounded-2xl border border-gray-100 border-t-4 border-t-green-500 bg-white p-5 shadow-card">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-serif text-base font-bold text-gray-900">Staff Roster</h2>
                <Link to="/staff" className="text-xs text-amber-700 font-semibold">Manage →</Link>
              </div>
              <div className="space-y-2">
                {therapists.map(t => (
                  <div key={t.id} className="flex items-center gap-2 text-sm">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${t.available ? 'bg-green-400' : 'bg-gray-300'}`} />
                    <span className={`flex-1 truncate ${t.available ? 'text-gray-800' : 'text-gray-400'}`}>{t.name}</span>
                    <span className="text-xs text-gray-400">{t.shift}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Admin quick links */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-card">
              <h2 className="font-serif text-base font-bold text-gray-900 mb-3">Admin Tools</h2>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'All Patients', href: '/records', icon: '👥' },
                  { label: 'Appointments', href: '/appointments', icon: '📅' },
                  { label: 'Inventory', href: '/inventory', icon: '📦' },
                  { label: 'Analytics', href: '/analytics', icon: '📊' },
                  { label: 'Staff', href: '/staff', icon: '👨‍⚕️' },
                  { label: 'ML Models', href: '/heatmap', icon: '🤖' },
                ].map(l => (
                  <Link key={l.href} to={l.href}
                    className="flex items-center gap-2 rounded-xl border border-gray-100 p-2.5 text-xs font-medium text-gray-700 hover:bg-purple-50 hover:border-purple-200 transition-colors">
                    <span>{l.icon}</span>{l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── PRACTITIONER DASHBOARD ────────────────────────────────────────────────────
// Clinical focus: patient consultations, therapy recommendations, protocols

function PractitionerDashboard() {
  const { state, updateAppointmentStatus, cancelAppointment } = useApp()
  const { patients, appointments, currentUser } = state

  const today = new Date().toISOString().slice(0, 10)
  const myApts = appointments.filter(a => a.date === today && a.status !== 'cancelled')
  const completedToday = myApts.filter(a => a.status === 'completed').length
  const pendingApts = myApts.filter(a => a.status === 'scheduled')

  const safetyAlerts = appointments.filter(a =>
    a.status !== 'cancelled' && (
      (a.koshta === 'Mrudu' && a.therapy === 'Virechana') ||
      (a.agni === 'Manda' && (a.therapy === 'Snehapana' || a.therapy === 'Abhyanga'))
    )
  )

  // Dosha distribution of patients
  const doshaCount: Record<string, number> = {}
  patients.forEach(p => { doshaCount[p.prakriti] = (doshaCount[p.prakriti] || 0) + 1 })
  const topDosha = Object.entries(doshaCount).sort((a, b) => b[1] - a[1])[0]

  return (
    <div className="min-h-[70vh] bg-[#fafaf8]">
      <div className="container-wide py-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold bg-amber-100 text-amber-700 rounded-full px-2.5 py-0.5 uppercase tracking-wider">Practitioner</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-gray-900">
              Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening'}, {currentUser?.name}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link to="/register" className="btn-primary text-sm">+ New Patient</Link>
            <Link to="/schedule" className="btn-outline-amber text-sm">+ Book Therapy</Link>
          </div>
        </div>

        {/* Safety alerts */}
        {safetyAlerts.length > 0 && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-bold text-red-800 mb-2">🚨 Clinical Safety Alerts</p>
            {safetyAlerts.map(a => (
              <p key={a.id} className="text-xs text-red-700">
                <strong>{a.patientName}</strong> — {a.therapy} contraindicated with {a.koshta} Koshta / {a.agni} Agni.
              </p>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard label="Today's Patients" value={myApts.length} sub={`${completedToday} seen`} color="border-l-amber-500" />
          <StatCard label="Pending" value={pendingApts.length} sub="Awaiting consultation" color="border-l-blue-500" />
          <StatCard label="Total Patients" value={patients.length} sub="Under care" color="border-l-green-500" />
          <StatCard label="Top Prakriti" value={topDosha?.[0] ?? '—'} sub={`${topDosha?.[1] ?? 0} patients`} color="border-l-purple-500" />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Today's consultations */}
          <div className="lg:col-span-2 rounded-2xl border border-gray-100 border-t-4 border-t-amber-500 bg-white p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-lg font-bold text-gray-900">Today's Consultations</h2>
              <Link to="/appointments" className="text-xs text-amber-700 font-semibold">All appointments →</Link>
            </div>
            {myApts.length === 0 ? (
              <div className="py-12 text-center text-gray-400">
                <p className="text-sm">No consultations scheduled today</p>
                <Link to="/schedule" className="btn-primary text-xs mt-3 inline-flex">Schedule Now</Link>
              </div>
            ) : (
              <div className="space-y-3">
                {myApts.map(apt => (
                  <AptRow key={apt.id} apt={apt}
                    onStart={() => updateAppointmentStatus(apt.id, 'in-progress')}
                    onComplete={() => updateAppointmentStatus(apt.id, 'completed')}
                    onCancel={() => cancelAppointment(apt.id)} />
                ))}
              </div>
            )}
          </div>

          {/* Right column */}
          <div className="space-y-5">
            {/* Patient Prakriti summary */}
            <div className="rounded-2xl border border-gray-100 border-t-4 border-t-amber-500 bg-white p-5 shadow-card">
              <h2 className="font-serif text-base font-bold text-gray-900 mb-3">Patient Prakriti Summary</h2>
              <div className="space-y-2">
                {Object.entries(doshaCount).sort((a, b) => b[1] - a[1]).map(([prakriti, count]) => {
                  const pct = Math.round((count / patients.length) * 100)
                  return (
                    <div key={prakriti}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-gray-700">{prakriti}</span>
                        <span className="text-gray-400">{count} ({pct}%)</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
                        <div className="h-full rounded-full bg-amber-400" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  )
                })}
                {patients.length === 0 && <p className="text-xs text-gray-400">No patients registered yet</p>}
              </div>
            </div>

            {/* Clinical quick links */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-card">
              <h2 className="font-serif text-base font-bold text-gray-900 mb-3">Clinical Tools</h2>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Patient Records', href: '/records', icon: '📋' },
                  { label: 'Register Patient', href: '/register', icon: '📝' },
                  { label: 'Therapy Cycle', href: '/cycle', icon: '🗓️' },
                  { label: 'Diet Planner', href: '/diet', icon: '🥗' },
                  { label: 'ML Scheduler', href: '/schedule', icon: '⚕️' },
                  { label: 'ML Models', href: '/heatmap', icon: '🤖' },
                ].map(l => (
                  <Link key={l.href} to={l.href}
                    className="flex items-center gap-2 rounded-xl border border-gray-100 p-2.5 text-xs font-medium text-gray-700 hover:bg-amber-50 hover:border-amber-200 transition-colors">
                    <span>{l.icon}</span>{l.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Protocols reminder */}
            <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5">
              <h2 className="font-serif text-base font-bold text-amber-900 mb-2">Protocol Reminders</h2>
              <ul className="space-y-1.5 text-xs text-amber-800">
                <li>✦ Confirm Agni state before Snehapana dosing</li>
                <li>✦ Check Koshta before prescribing Virechana</li>
                <li>✦ Pitta Prakriti — limit Swedana temperature</li>
                <li>✦ 15-min turnaround buffer between sessions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── THERAPIST DASHBOARD ───────────────────────────────────────────────────────
// Focused view: only their own assigned sessions for today

function TherapistDashboard() {
  const { state, updateAppointmentStatus } = useApp()
  const { appointments, currentUser } = state

  const today = new Date().toISOString().slice(0, 10)

  // Therapist sees only sessions assigned to them
  const mySessions = appointments.filter(a =>
    a.date === today &&
    a.status !== 'cancelled' &&
    a.therapistName === currentUser?.name
  )

  const allTodaySessions = appointments.filter(a => a.date === today && a.status !== 'cancelled')

  const completedCount = mySessions.filter(a => a.status === 'completed').length
  const nextSession = mySessions.find(a => a.status === 'scheduled')

  // Safety alerts for their sessions only
  const myAlerts = mySessions.filter(a =>
    (a.koshta === 'Mrudu' && a.therapy === 'Virechana') ||
    (a.agni === 'Manda' && (a.therapy === 'Snehapana' || a.therapy === 'Abhyanga'))
  )

  return (
    <div className="min-h-[70vh] bg-[#fafaf8]">
      <div className="container-wide py-8 max-w-4xl">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold bg-green-100 text-green-700 rounded-full px-2.5 py-0.5 uppercase tracking-wider">Therapist</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-gray-900">
              {currentUser?.name ?? 'Therapist'}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="rounded-xl bg-white border border-gray-100 shadow-card px-5 py-3 text-center">
            <p className="text-xs text-gray-400">My sessions today</p>
            <p className="font-serif text-3xl font-bold text-amber-700">{mySessions.length}</p>
            <p className="text-xs text-gray-400">{completedCount} completed</p>
          </div>
        </div>

        {/* Safety alerts for therapist's sessions */}
        {myAlerts.length > 0 && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-bold text-red-800 mb-2">🚨 Safety Alert — Your Sessions</p>
            {myAlerts.map(a => (
              <p key={a.id} className="text-xs text-red-700">
                <strong>{a.patientName}</strong> at {a.time} — {a.therapy} with {a.koshta} Koshta. Follow modified protocol.
              </p>
            ))}
          </div>
        )}

        {/* Next session highlight */}
        {nextSession && (
          <div className="mb-6 rounded-2xl border-2 border-amber-300 bg-amber-50 p-5">
            <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-2">Next Session</p>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-serif text-xl font-bold text-gray-900">{nextSession.patientName}</p>
                <p className="text-sm text-gray-600">{nextSession.therapy} · {nextSession.time} · {nextSession.roomName}</p>
                <div className="flex gap-1 mt-2">
                  <span className="text-xs bg-amber-100 text-amber-700 rounded px-2 py-0.5">Prakriti: {nextSession.prakriti}</span>
                  <span className="text-xs bg-blue-100 text-blue-700 rounded px-2 py-0.5">Agni: {nextSession.agni}</span>
                  <span className="text-xs bg-purple-100 text-purple-700 rounded px-2 py-0.5">Koshta: {nextSession.koshta}</span>
                </div>
              </div>
              <button
                onClick={() => updateAppointmentStatus(nextSession.id, 'in-progress')}
                className="btn-primary text-sm shrink-0"
              >
                Start Session →
              </button>
            </div>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {/* My full day schedule */}
          <div className="rounded-2xl border border-gray-100 border-t-4 border-t-green-500 bg-white p-6 shadow-card">
            <h2 className="font-serif text-lg font-bold text-gray-900 mb-4">My Schedule Today</h2>
            {mySessions.length === 0 ? (
              <div className="py-12 text-center text-gray-400">
                <p className="text-sm">No sessions assigned to you today</p>
              </div>
            ) : (
              <div className="space-y-3">
                {mySessions.sort((a, b) => a.time.localeCompare(b.time)).map(apt => (
                  <div key={apt.id} className={`rounded-xl border p-3 transition-colors ${
                    apt.status === 'in-progress' ? 'border-amber-300 bg-amber-50' :
                    apt.status === 'completed' ? 'border-green-200 bg-green-50/50 opacity-70' :
                    'border-gray-100 hover:bg-gray-50'
                  }`}>
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900 text-sm">{apt.time}</span>
                          <span className={`text-xs rounded-full px-2 py-0.5 font-medium ${statusColors[apt.status]}`}>{apt.status}</span>
                        </div>
                        <p className="font-semibold text-gray-800 mt-0.5">{apt.patientName}</p>
                        <p className="text-xs text-gray-500">{apt.therapy} · {apt.roomName}</p>
                        <div className="flex gap-1 mt-1">
                          <span className="text-xs bg-amber-50 text-amber-700 rounded px-1.5 py-0.5">{apt.prakriti}</span>
                          <span className="text-xs bg-blue-50 text-blue-700 rounded px-1.5 py-0.5">{apt.agni}</span>
                          <span className="text-xs bg-purple-50 text-purple-700 rounded px-1.5 py-0.5">{apt.koshta}</span>
                        </div>
                        {apt.notes && <p className="text-xs text-gray-400 mt-1 italic">"{apt.notes}"</p>}
                      </div>
                      <div className="flex flex-col gap-1 shrink-0">
                        {apt.status === 'scheduled' && (
                          <button onClick={() => updateAppointmentStatus(apt.id, 'in-progress')}
                            className="text-xs bg-amber-100 text-amber-800 rounded-lg px-2 py-1 hover:bg-amber-200 font-medium">Start</button>
                        )}
                        {apt.status === 'in-progress' && (
                          <button onClick={() => updateAppointmentStatus(apt.id, 'completed')}
                            className="text-xs bg-green-100 text-green-800 rounded-lg px-2 py-1 hover:bg-green-200 font-medium">Done</button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right column */}
          <div className="space-y-5">
            {/* Progress */}
            <div className="rounded-2xl border border-gray-100 border-t-4 border-t-amber-500 bg-white p-5 shadow-card">
              <h2 className="font-serif text-base font-bold text-gray-900 mb-3">Today's Progress</h2>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">Sessions completed</span>
                    <span className="font-semibold">{completedCount}/{mySessions.length}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full rounded-full bg-green-400 transition-all"
                      style={{ width: mySessions.length > 0 ? `${(completedCount / mySessions.length) * 100}%` : '0%' }} />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="rounded-lg bg-blue-50 p-2">
                    <p className="font-bold text-blue-700">{mySessions.filter(a => a.status === 'scheduled').length}</p>
                    <p className="text-gray-400">Pending</p>
                  </div>
                  <div className="rounded-lg bg-amber-50 p-2">
                    <p className="font-bold text-amber-700">{mySessions.filter(a => a.status === 'in-progress').length}</p>
                    <p className="text-gray-400">Active</p>
                  </div>
                  <div className="rounded-lg bg-green-50 p-2">
                    <p className="font-bold text-green-700">{completedCount}</p>
                    <p className="text-gray-400">Done</p>
                  </div>
                </div>
              </div>
            </div>

            {/* All center sessions today (read-only view) */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-card">
              <h2 className="font-serif text-base font-bold text-gray-900 mb-3">Center Activity Today</h2>
              <div className="space-y-1.5">
                {allTodaySessions.slice(0, 5).map(a => (
                  <div key={a.id} className="flex items-center gap-2 text-xs">
                    <span className="text-gray-400 w-12 shrink-0">{a.time}</span>
                    <span className="flex-1 truncate text-gray-700">{a.patientName} — {a.therapy}</span>
                    <span className={`rounded-full px-1.5 py-0.5 font-medium ${statusColors[a.status]}`}>{a.status}</span>
                  </div>
                ))}
                {allTodaySessions.length === 0 && <p className="text-xs text-gray-400">No sessions today</p>}
              </div>
            </div>

            {/* Therapist protocol reminders */}
            <div className="rounded-2xl border border-green-100 bg-green-50 p-5">
              <h2 className="font-serif text-base font-bold text-green-900 mb-2">Session Reminders</h2>
              <ul className="space-y-1.5 text-xs text-green-800">
                <li>✦ Check oil temperature before Abhyanga</li>
                <li>✦ Manda Agni patients — use light oil only</li>
                <li>✦ Mrudu Koshta — gentle pressure only</li>
                <li>✦ Clean room 15 min before next session</li>
                <li>✦ Document session notes after each patient</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── MAIN DASHBOARD — routes to correct role view ──────────────────────────────

export default function Dashboard() {
  const { state } = useApp()
  const role = state.currentUser?.role

  if (role === 'patient') return <PatientPortal />
  if (role === 'admin') return <AdminDashboard />
  if (role === 'therapist') return <TherapistDashboard />
  return <PractitionerDashboard />
}
