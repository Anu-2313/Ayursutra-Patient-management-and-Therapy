import React from 'react'

export default function ScheduleDemo() {
  const [patient, setPatient] = React.useState('')
  const [therapy, setTherapy] = React.useState('Abhyanga')
  const [date, setDate] = React.useState<string>(() => new Date().toISOString().slice(0, 10))
  const [time, setTime] = React.useState('10:00')
  const [notes, setNotes] = React.useState('')
  const [scheduled, setScheduled] = React.useState<null | {
    id: string
    patient: string
    therapy: string
    date: string
    time: string
  }>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const id = Math.random().toString(36).slice(2, 8).toUpperCase()
    setScheduled({ id, patient, therapy, date, time })
  }

  return (
    <div className="min-h-[70vh] flex items-start">
      <div className="container-wide py-10 grid gap-8 md:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-gray-900">Schedule Therapy Session</h1>
          <p className="mt-1 text-sm text-gray-600">Demo flow to book a Panchakarma therapy.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="patient" className="block text-sm font-medium text-gray-700">Patient name</label>
              <input id="patient" value={patient} onChange={(e) => setPatient(e.target.value)}
                     className="mt-1 w-full rounded-md border-gray-300 focus:border-brand-600 focus:ring-brand-600" placeholder="e.g. S. Sharma" required />
            </div>

            <div>
              <label htmlFor="therapy" className="block text-sm font-medium text-gray-700">Therapy</label>
              <select id="therapy" value={therapy} onChange={(e) => setTherapy(e.target.value)}
                      className="mt-1 w-full rounded-md border-gray-300 focus:border-brand-600 focus:ring-brand-600">
                {['Abhyanga', 'Shirodhara', 'Pizhichil', 'Basti', 'Nasya'].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)}
                       className="mt-1 w-full rounded-md border-gray-300 focus:border-brand-600 focus:ring-brand-600" />
              </div>
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
                <input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)}
                       className="mt-1 w-full rounded-md border-gray-300 focus:border-brand-600 focus:ring-brand-600" />
              </div>
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes (optional)</label>
              <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)}
                        className="mt-1 w-full rounded-md border-gray-300 focus:border-brand-600 focus:ring-brand-600" rows={3}
                        placeholder="Any allergies, preferences, or physician instructions" />
            </div>

            <button type="submit" className="btn-primary w-full justify-center">Book session</button>
          </form>
        </div>

        <div className="rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">Live Preview</h2>
          {!scheduled ? (
            <p className="mt-3 text-sm text-gray-600">Fill the form to see a booking summary here.</p>
          ) : (
            <div className="mt-4 space-y-2 text-sm text-gray-700">
              <div className="rounded-lg bg-brand-50 border border-brand-100 p-4">
                <p className="text-brand-900 font-medium">Booking Confirmed</p>
                <p className="text-brand-800">Ref: {scheduled.id}</p>
              </div>
              <p><span className="text-gray-500">Patient:</span> {scheduled.patient}</p>
              <p><span className="text-gray-500">Therapy:</span> {scheduled.therapy}</p>
              <p><span className="text-gray-500">Date:</span> {scheduled.date}</p>
              <p><span className="text-gray-500">Time:</span> {scheduled.time}</p>
              <div className="mt-4 flex gap-3">
                <button className="inline-flex items-center rounded-md border border-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-50">Reschedule</button>
                <button className="inline-flex items-center rounded-md bg-brand-600 px-4 py-2 text-white hover:bg-brand-700">Notify Patient</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
