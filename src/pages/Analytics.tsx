import React from 'react'
import { useApp } from '../store/appStore.tsx'

function MetricCard({ label, value, sub, delta, color }: { label: string; value: string; sub?: string; delta?: string; color: string }) {
  return (
    <div className={`rounded-2xl border bg-white p-5 shadow-card border-l-4 ${color}`}>
      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{label}</p>
      <p className="font-serif text-3xl font-bold text-gray-900 mt-1">{value}</p>
      {delta && <p className="text-xs text-green-600 font-semibold mt-1">{delta}</p>}
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  )
}

// Research paper efficiency data
const EFFICIENCY_DATA = [
  { task: 'New Patient Onboarding',          manual: '12.5 min', digital: '3.2 min', saved: '74.4%' },
  { task: 'Therapy Cycle Scheduling (7 Days)', manual: '18.0 min', digital: '1.5 min', saved: '91.6%' },
  { task: 'Retrieving Prakriti Records',      manual: '5.0 min',  digital: '<5 sec',  saved: '98.3%' },
  { task: 'Daily Resource Utilization Report', manual: '45.0 min', digital: 'Instant', saved: '100%' },
]

export default function Analytics() {
  const { state } = useApp()
  const { patients, appointments, therapists, rooms, inventory } = state

  const today = new Date().toISOString().slice(0, 10)
  const todayApts = appointments.filter(a => a.date === today)
  const completedApts = appointments.filter(a => a.status === 'completed')
  const cancelledApts = appointments.filter(a => a.status === 'cancelled')
  const availableRooms = rooms.filter(r => r.available).length
  const utilizationRate = rooms.length > 0 ? Math.round(((rooms.length - availableRooms) / rooms.length) * 100) : 0

  // Therapy distribution
  const therapyCount: Record<string, number> = {}
  appointments.forEach(a => { therapyCount[a.therapy] = (therapyCount[a.therapy] || 0) + 1 })
  const topTherapies = Object.entries(therapyCount).sort((a, b) => b[1] - a[1]).slice(0, 5)

  // Dosha distribution
  const doshaCount: Record<string, number> = {}
  patients.forEach(p => { doshaCount[p.prakriti] = (doshaCount[p.prakriti] || 0) + 1 })

  // Agni distribution
  const agniCount: Record<string, number> = {}
  patients.forEach(p => { agniCount[p.agni] = (agniCount[p.agni] || 0) + 1 })

  const lowStockCount = inventory.filter(i => i.currentStock <= i.reorderLevel).length

  return (
    <div className="min-h-[70vh] bg-[#fafaf8]">
      <div className="container-wide py-8">

        <div className="mb-6">
          <h1 className="font-serif text-2xl font-bold text-gray-900">Operational Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">Real-time center performance metrics — aligned with NABH standards for Ayush hospitals.</p>
        </div>

        {/* KPI grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard label="Total Patients" value={String(patients.length)} sub="Longitudinal records" color="border-l-amber-500" />
          <MetricCard label="Total Appointments" value={String(appointments.length)} sub={`${completedApts.length} completed`} color="border-l-blue-500" />
          <MetricCard label="Room Utilization" value={`${utilizationRate}%`} delta="↓ 40% idle time vs manual" sub="Static Idle Time reduced" color="border-l-green-500" />
          <MetricCard label="Admin Time Saved" value="88%" delta="vs manual processes" sub="Per research paper findings" color="border-l-purple-500" />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">

          {/* Efficiency comparison table */}
          <div className="rounded-2xl border border-gray-100 border-t-4 border-t-amber-500 bg-white p-6 shadow-card">
            <h2 className="font-serif text-lg font-bold text-gray-900 mb-4">Automation Efficiency</h2>
            <p className="text-xs text-gray-400 mb-4">Manual vs AyurSutra process time comparison (research paper findings)</p>
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-2 text-gray-500 font-semibold">Task</th>
                    <th className="text-center py-2 text-gray-500 font-semibold">Manual</th>
                    <th className="text-center py-2 text-gray-500 font-semibold">AyurSutra</th>
                    <th className="text-center py-2 text-gray-500 font-semibold">Saved</th>
                  </tr>
                </thead>
                <tbody>
                  {EFFICIENCY_DATA.map((row, i) => (
                    <tr key={i} className="border-b border-gray-50">
                      <td className="py-2.5 text-gray-700 pr-4">{row.task}</td>
                      <td className="py-2.5 text-center text-red-600 font-medium">{row.manual}</td>
                      <td className="py-2.5 text-center text-green-600 font-medium">{row.digital}</td>
                      <td className="py-2.5 text-center">
                        <span className="bg-green-100 text-green-700 rounded-full px-2 py-0.5 font-bold">{row.saved}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Therapy distribution */}
          <div className="rounded-2xl border border-gray-100 border-t-4 border-t-blue-500 bg-white p-6 shadow-card">
            <h2 className="font-serif text-lg font-bold text-gray-900 mb-4">Therapy Distribution</h2>
            <div className="space-y-3">
              {topTherapies.length === 0 ? (
                <p className="text-sm text-gray-400">No appointment data yet</p>
              ) : topTherapies.map(([therapy, count]) => {
                const pct = Math.round((count / appointments.length) * 100)
                return (
                  <div key={therapy}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium text-gray-700">{therapy}</span>
                      <span className="text-gray-400">{count} sessions ({pct}%)</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full rounded-full bg-amber-400 transition-all" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Prakriti distribution */}
          <div className="rounded-2xl border border-gray-100 border-t-4 border-t-green-500 bg-white p-6 shadow-card">
            <h2 className="font-serif text-lg font-bold text-gray-900 mb-4">Patient Prakriti Distribution</h2>
            <div className="space-y-3">
              {Object.entries(doshaCount).length === 0 ? (
                <p className="text-sm text-gray-400">No patient data yet</p>
              ) : Object.entries(doshaCount).sort((a, b) => b[1] - a[1]).map(([prakriti, count]) => {
                const pct = Math.round((count / patients.length) * 100)
                const colors: Record<string, string> = { Vata: 'bg-blue-400', Pitta: 'bg-red-400', Kapha: 'bg-green-400' }
                const colorKey = Object.keys(colors).find(k => prakriti.includes(k))
                const color = colorKey ? colors[colorKey] : 'bg-amber-400'
                return (
                  <div key={prakriti}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium text-gray-700">{prakriti}</span>
                      <span className="text-gray-400">{count} patients ({pct}%)</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Agni distribution */}
          <div className="rounded-2xl border border-gray-100 border-t-4 border-t-purple-500 bg-white p-6 shadow-card">
            <h2 className="font-serif text-lg font-bold text-gray-900 mb-4">Agni State Distribution</h2>
            <div className="space-y-3">
              {Object.entries(agniCount).length === 0 ? (
                <p className="text-sm text-gray-400">No patient data yet</p>
              ) : Object.entries(agniCount).sort((a, b) => b[1] - a[1]).map(([agni, count]) => {
                const pct = Math.round((count / patients.length) * 100)
                const agniColors: Record<string, string> = { Samagni: 'bg-green-400', Manda: 'bg-red-400', Tikshna: 'bg-amber-400', Vishama: 'bg-orange-400' }
                return (
                  <div key={agni}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium text-gray-700">{agni}</span>
                      <span className="text-gray-400">{count} patients ({pct}%)</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${agniColors[agni] || 'bg-gray-400'}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Stress test results from paper */}
            <div className="mt-5 rounded-xl bg-amber-50 border border-amber-100 p-3 text-xs text-amber-800">
              <p className="font-bold mb-1">Conflict Resolution Stress Test Results</p>
              <p>100 concurrent requests · 15 collision attempts · <strong>100% Logic Gate Success Rate</strong></p>
              <p className="mt-1">SIT Reduction: <strong>40%</strong> · Additional sessions/room/day: <strong>+2.5</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
