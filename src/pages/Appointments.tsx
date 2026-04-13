import React from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../store/appStore.tsx'

const statusColors: Record<string, string> = {
  'scheduled':   'bg-blue-100 text-blue-700 border-blue-200',
  'in-progress': 'bg-amber-100 text-amber-700 border-amber-200',
  'completed':   'bg-green-100 text-green-700 border-green-200',
  'cancelled':   'bg-gray-100 text-gray-500 border-gray-200',
}

const THERAPIES = ['All', 'Abhyanga', 'Shirodhara', 'Basti', 'Nasya', 'Virechana', 'Vamana', 'Pizhichil', 'Swedana']

export default function Appointments() {
  const { state, updateAppointmentStatus, cancelAppointment } = useApp()
  const { appointments, currentUser } = state

  const [filterDate, setFilterDate] = React.useState(new Date().toISOString().slice(0, 10))
  const [filterStatus, setFilterStatus] = React.useState('all')
  const [filterTherapy, setFilterTherapy] = React.useState('All')
  const [view, setView] = React.useState<'list' | 'calendar'>('list')

  const filtered = appointments.filter(a => {
    // Patient role only sees their own appointments
    const matchPatient = currentUser?.role !== 'patient' || a.patientId === currentUser?.patientId
    const matchDate = !filterDate || a.date === filterDate
    const matchStatus = filterStatus === 'all' || a.status === filterStatus
    const matchTherapy = filterTherapy === 'All' || a.therapy === filterTherapy
    return matchPatient && matchDate && matchStatus && matchTherapy
  }).sort((a, b) => a.time.localeCompare(b.time))

  // Calendar: group by date for week view
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i)
    return d.toISOString().slice(0, 10)
  })

  return (
    <div className="min-h-[70vh] bg-[#fafaf8]">
      <div className="container-wide py-8">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="font-serif text-2xl font-bold text-gray-900">
              {currentUser?.role === 'patient' ? 'My Appointments' : 'Appointments'}
            </h1>
            <p className="text-sm text-gray-500 mt-1">Conflict-free scheduling with 15-min turnaround buffer</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setView('list')}
              className={`text-xs px-3 py-2 rounded-lg font-semibold border transition-colors ${view === 'list' ? 'bg-amber-500 text-white border-amber-500' : 'bg-white text-gray-600 border-gray-200'}`}>
              List
            </button>
            <button onClick={() => setView('calendar')}
              className={`text-xs px-3 py-2 rounded-lg font-semibold border transition-colors ${view === 'calendar' ? 'bg-amber-500 text-white border-amber-500' : 'bg-white text-gray-600 border-gray-200'}`}>
              Week View
            </button>
            {currentUser?.role !== 'patient' && (
              <Link to="/schedule" className="btn-primary text-sm">+ New Booking</Link>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)}
            className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-amber-500" />
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
            className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-amber-500">
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select value={filterTherapy} onChange={e => setFilterTherapy(e.target.value)}
            className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-amber-500">
            {THERAPIES.map(t => <option key={t}>{t}</option>)}
          </select>
          <button onClick={() => { setFilterDate(''); setFilterStatus('all'); setFilterTherapy('All') }}
            className="text-xs text-gray-500 hover:text-gray-700 px-3 py-2 rounded-xl border border-gray-200 bg-white">
            Clear filters
          </button>
        </div>

        {view === 'list' ? (
          <div className="rounded-2xl border border-amber-100 overflow-hidden shadow-card">
            <table className="min-w-full text-sm">
              <thead className="bg-amber-50">
                <tr>
                  {['ID', 'Patient', 'Therapy', 'Date', 'Time', 'Therapist', 'Room', 'Prakriti/Agni/Koshta', 'Status', 'Actions'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-amber-800 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-50/80 bg-white">
                {filtered.length === 0 ? (
                  <tr><td colSpan={10} className="px-4 py-12 text-center text-sm text-gray-400">No appointments found</td></tr>
                ) : filtered.map(apt => (
                  <tr key={apt.id} className="hover:bg-amber-50/30 transition-colors">
                    <td className="px-4 py-3"><span className="font-mono text-xs bg-gray-100 rounded px-1.5 py-0.5">{apt.id}</span></td>
                    <td className="px-4 py-3 font-medium text-gray-900">{apt.patientName}</td>
                    <td className="px-4 py-3 text-gray-700">{apt.therapy}</td>
                    <td className="px-4 py-3 text-gray-500">{apt.date}</td>
                    <td className="px-4 py-3 font-semibold text-gray-800">{apt.time}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{apt.therapistName}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{apt.roomName}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 flex-wrap">
                        <span className="text-xs bg-amber-50 text-amber-700 rounded px-1.5 py-0.5">{apt.prakriti}</span>
                        <span className="text-xs bg-blue-50 text-blue-700 rounded px-1.5 py-0.5">{apt.agni}</span>
                        <span className="text-xs bg-purple-50 text-purple-700 rounded px-1.5 py-0.5">{apt.koshta}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs rounded-full border px-2 py-0.5 font-medium ${statusColors[apt.status]}`}>
                        {apt.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        {currentUser?.role !== 'patient' && apt.status === 'scheduled' && (
                          <button onClick={() => updateAppointmentStatus(apt.id, 'in-progress')}
                            className="text-xs bg-amber-100 text-amber-800 rounded px-2 py-1 hover:bg-amber-200 font-medium">Start</button>
                        )}
                        {currentUser?.role !== 'patient' && apt.status === 'in-progress' && (
                          <button onClick={() => updateAppointmentStatus(apt.id, 'completed')}
                            className="text-xs bg-green-100 text-green-800 rounded px-2 py-1 hover:bg-green-200 font-medium">Done</button>
                        )}
                        {currentUser?.role !== 'patient' && apt.status !== 'completed' && apt.status !== 'cancelled' && (
                          <button onClick={() => cancelAppointment(apt.id)}
                            className="text-xs bg-red-50 text-red-600 rounded px-2 py-1 hover:bg-red-100 font-medium">Cancel</button>
                        )}
                        {currentUser?.role === 'patient' && (
                          <span className="text-xs text-gray-400">—</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-4 py-2 bg-amber-50/50 text-xs text-gray-400">{filtered.length} appointment{filtered.length !== 1 ? 's' : ''}</div>
          </div>
        ) : (
          // Week calendar view
          <div className="rounded-2xl border border-gray-100 bg-white shadow-card overflow-x-auto">
            <div className="grid grid-cols-7 min-w-[700px]">
              {weekDates.map(date => {
                const dayApts = appointments.filter(a => a.date === date && a.status !== 'cancelled')
                const isToday = date === new Date().toISOString().slice(0, 10)
                return (
                  <div key={date} className={`border-r border-gray-100 last:border-r-0 min-h-[200px] ${isToday ? 'bg-amber-50/40' : ''}`}>
                    <div className={`px-3 py-2 border-b border-gray-100 text-xs font-semibold ${isToday ? 'text-amber-700' : 'text-gray-500'}`}>
                      {new Date(date + 'T12:00:00').toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric' })}
                      {isToday && <span className="ml-1 text-amber-500">●</span>}
                    </div>
                    <div className="p-2 space-y-1">
                      {dayApts.map(a => (
                        <div key={a.id} className={`rounded-lg p-1.5 text-xs border ${statusColors[a.status]}`}>
                          <p className="font-semibold">{a.time} {a.patientName}</p>
                          <p className="opacity-80">{a.therapy}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
