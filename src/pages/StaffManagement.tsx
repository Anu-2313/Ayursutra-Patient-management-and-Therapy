import React from 'react'
import { useApp } from '../store/appStore.tsx'

export default function StaffManagement() {
  const { state, toggleTherapistAvailability, toggleRoomAvailability } = useApp()
  const { therapists, rooms, appointments } = state

  const today = new Date().toISOString().slice(0, 10)

  function getTherapistLoad(therapistId: string) {
    return appointments.filter(a => a.therapistId === therapistId && a.date === today && a.status !== 'cancelled').length
  }

  function getRoomLoad(roomId: string) {
    return appointments.filter(a => a.roomId === roomId && a.date === today && a.status !== 'cancelled').length
  }

  return (
    <div className="min-h-[70vh] bg-[#fafaf8]">
      <div className="container-wide py-8">
        <div className="mb-6">
          <h1 className="font-serif text-2xl font-bold text-gray-900">Staff & Resource Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage therapist availability and therapy room status. Conflict resolution uses 15-min turnaround buffer.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">

          {/* Therapists */}
          <div className="rounded-2xl border border-gray-100 border-t-4 border-t-amber-500 bg-white p-6 shadow-card">
            <h2 className="font-serif text-lg font-bold text-gray-900 mb-4">Therapist Roster</h2>
            <div className="space-y-3">
              {therapists.map(t => {
                const load = getTherapistLoad(t.id)
                return (
                  <div key={t.id} className="rounded-xl border border-gray-100 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-full ${t.available ? 'bg-green-400' : 'bg-gray-300'}`} />
                          <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Shift: {t.shift} · Today: {load} session{load !== 1 ? 's' : ''}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {t.specializations.map(s => (
                            <span key={s} className="text-xs bg-amber-50 text-amber-700 rounded-full px-2 py-0.5">{s}</span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => toggleTherapistAvailability(t.id)}
                        className={`text-xs rounded-lg px-3 py-1.5 font-semibold border transition-colors ${
                          t.available
                            ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                            : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        {t.available ? 'Available' : 'Unavailable'}
                      </button>
                    </div>
                    {/* Load bar */}
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Daily load</span><span>{load}/6 sessions</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
                        <div className={`h-full rounded-full transition-all ${load >= 5 ? 'bg-red-400' : load >= 3 ? 'bg-amber-400' : 'bg-green-400'}`}
                          style={{ width: `${Math.min((load / 6) * 100, 100)}%` }} />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Rooms */}
          <div className="rounded-2xl border border-gray-100 border-t-4 border-t-blue-500 bg-white p-6 shadow-card">
            <h2 className="font-serif text-lg font-bold text-gray-900 mb-4">Therapy Rooms</h2>
            <div className="space-y-3">
              {rooms.map(r => {
                const load = getRoomLoad(r.id)
                return (
                  <div key={r.id} className="rounded-xl border border-gray-100 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-full ${r.available ? 'bg-green-400' : 'bg-red-400'}`} />
                          <p className="font-semibold text-gray-900 text-sm">{r.name}</p>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Type: {r.type} · Today: {load} booking{load !== 1 ? 's' : ''}</p>
                        {r.lastCleaned && (
                          <p className="text-xs text-gray-400">Last cleaned: {new Date(r.lastCleaned).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</p>
                        )}
                      </div>
                      <button
                        onClick={() => toggleRoomAvailability(r.id)}
                        className={`text-xs rounded-lg px-3 py-1.5 font-semibold border transition-colors ${
                          r.available
                            ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                            : 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
                        }`}
                      >
                        {r.available ? 'Free' : 'Occupied'}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Turnaround note */}
            <div className="mt-4 rounded-xl bg-amber-50 border border-amber-100 p-3 text-xs text-amber-800">
              ✦ 15-minute turnaround buffer is automatically applied between all room bookings for cleaning and preparation.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
