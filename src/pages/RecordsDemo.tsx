import React from 'react'

type RecordItem = {
  id: string
  patient: string
  therapy: string
  date: string
  notes?: string
}

export default function RecordsDemo() {
  const [records, setRecords] = React.useState<RecordItem[]>([
    { id: 'REC-1024', patient: 'A. Verma', therapy: 'Shirodhara', date: '2025-11-12', notes: 'Improved sleep' },
    { id: 'REC-1025', patient: 'S. Sharma', therapy: 'Abhyanga', date: '2025-11-13' },
  ])
  const [query, setQuery] = React.useState('')

  const filtered = records.filter(r =>
    [r.id, r.patient, r.therapy, r.date, r.notes ?? '']
      .join(' ').toLowerCase().includes(query.toLowerCase())
  )

  function addMock() {
    const id = 'REC-' + Math.floor(Math.random() * 9000 + 1000)
    setRecords(prev => ([...prev, { id, patient: 'New Patient', therapy: 'Nasya', date: new Date().toISOString().slice(0,10) }]))
  }

  return (
    <div className="min-h-[70vh] flex items-start">
      <div className="container-wide py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Digital Health Records (Demo)</h1>
            <p className="mt-1 text-sm text-gray-600">Centralized records searchable by patient, therapy, or date.</p>
          </div>
          <div className="flex gap-3">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-64 rounded-md border-gray-300 focus:border-brand-600 focus:ring-brand-600"
              placeholder="Search records..."
            />
            <button onClick={addMock} className="btn-primary">Add mock</button>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-gray-100">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Record ID</th>
                <th className="px-4 py-3 text-left font-medium">Patient</th>
                <th className="px-4 py-3 text-left font-medium">Therapy</th>
                <th className="px-4 py-3 text-left font-medium">Date</th>
                <th className="px-4 py-3 text-left font-medium">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {filtered.map(r => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-gray-600">{r.id}</td>
                  <td className="px-4 py-3">{r.patient}</td>
                  <td className="px-4 py-3">{r.therapy}</td>
                  <td className="px-4 py-3">{r.date}</td>
                  <td className="px-4 py-3 text-gray-500">{r.notes ?? '-'}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-gray-500">No records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
