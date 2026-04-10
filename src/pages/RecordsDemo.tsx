import React from 'react'
import FormField from '../components/FormField'

type RecordItem = {
  id: string
  patient: string
  therapy: string
  date: string
  notes?: string
}

const therapyColors: Record<string, string> = {
  Shirodhara: 'text-amber-500',
  Abhyanga: 'text-green-600',
  Nasya: 'text-blue-500',
}

function TherapyDot({ therapy }: { therapy: string }) {
  const color = therapyColors[therapy] ?? 'text-purple-500'
  return <span className={`mr-1.5 ${color}`}>●</span>
}

const SearchIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

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
    const therapies = ['Shirodhara', 'Abhyanga', 'Nasya', 'Basti', 'Udvartana']
    const therapy = therapies[Math.floor(Math.random() * therapies.length)]
    setRecords(prev => ([...prev, { id, patient: 'New Patient', therapy, date: new Date().toISOString().slice(0, 10) }]))
  }

  return (
    <div className="min-h-[70vh] flex items-start">
      <div className="container-wide py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="font-serif text-2xl font-bold text-gray-900">Digital Health Records</h1>
            <p className="mt-1 text-sm text-gray-500">Centralized records searchable by patient, therapy, or date.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-64">
              <FormField
                id="search"
                label=""
                type="text"
                value={query}
                onChange={setQuery}
                placeholder="Search records..."
                prefix={<SearchIcon />}
              />
            </div>
            <button onClick={addMock} className="btn-outline-amber shrink-0">
              + Add mock
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-amber-100 shadow-card">
          <table className="min-w-full text-sm">
            <thead className="bg-amber-50">
              <tr>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-amber-800 uppercase tracking-wider">Record ID</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-amber-800 uppercase tracking-wider">Patient</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-amber-800 uppercase tracking-wider">Therapy</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-amber-800 uppercase tracking-wider">Date</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-amber-800 uppercase tracking-wider">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-50/80 bg-white text-gray-700">
              {filtered.map(r => (
                <tr key={r.id} className="hover:bg-amber-50/50 transition-colors duration-150">
                  <td className="px-5 py-3.5">
                    <span className="font-mono text-xs bg-neutral-100 rounded-md px-2 py-0.5 text-neutral-600">
                      {r.id}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 font-medium">{r.patient}</td>
                  <td className="px-5 py-3.5">
                    <TherapyDot therapy={r.therapy} />
                    {r.therapy}
                  </td>
                  <td className="px-5 py-3.5 text-gray-500">{r.date}</td>
                  <td className="px-5 py-3.5 text-gray-400">{r.notes ?? '—'}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-16 text-center">
                    <div className="flex flex-col items-center gap-3 text-gray-400">
                      <svg className="w-10 h-10 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <p className="text-sm font-medium">No records found</p>
                      <p className="text-xs">Try adjusting your search query</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-xs text-gray-400">{filtered.length} record{filtered.length !== 1 ? 's' : ''} shown</p>
      </div>
    </div>
  )
}
