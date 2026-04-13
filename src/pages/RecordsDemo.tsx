import React from 'react'
import FormField from '../components/FormField'
import type { AgniState, KoshtaType, PrakritiType } from '../utils/mlModels'
import { useApp } from '../store/appStore.tsx'

type RecordItem = {
  id: string
  patient: string
  therapy: string
  date: string
  prakriti: PrakritiType
  agni: AgniState
  koshta: KoshtaType
  notes?: string
}

const therapyColors: Record<string, string> = {
  Shirodhara: 'text-amber-500',
  Abhyanga:   'text-green-600',
  Nasya:      'text-blue-500',
  Basti:      'text-purple-500',
  Virechana:  'text-red-500',
  Vamana:     'text-orange-500',
  Pizhichil:  'text-teal-500',
  Swedana:    'text-indigo-500',
}

const agniColors: Record<AgniState, string> = {
  Samagni: 'bg-green-100 text-green-700',
  Manda:   'bg-red-100 text-red-700',
  Tikshna: 'bg-amber-100 text-amber-700',
  Vishama: 'bg-orange-100 text-orange-700',
}

const koshtaColors: Record<KoshtaType, string> = {
  Madhya: 'bg-blue-100 text-blue-700',
  Krura:  'bg-amber-100 text-amber-700',
  Mrudu:  'bg-red-100 text-red-700',
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

const MOCK_THERAPIES = ['Shirodhara', 'Abhyanga', 'Nasya', 'Basti', 'Virechana', 'Vamana', 'Pizhichil', 'Swedana']
const MOCK_PRAKRITI: PrakritiType[] = ['Vata', 'Pitta', 'Kapha', 'Vata-Pitta']
const MOCK_AGNI: AgniState[] = ['Samagni', 'Manda', 'Tikshna', 'Vishama']
const MOCK_KOSHTA: KoshtaType[] = ['Madhya', 'Krura', 'Mrudu']

export default function RecordsDemo() {
  const { state } = useApp()
  const { patients, appointments } = state

  // Build records from registered patients + their appointments
  const patientRecords: RecordItem[] = patients.map(p => {
    const lastApt = appointments
      .filter(a => a.patientId === p.id)
      .sort((a, b) => b.date.localeCompare(a.date))[0]
    return {
      id: p.id,
      patient: p.name,
      therapy: lastApt?.therapy ?? '—',
      date: lastApt?.date ?? p.registeredAt.slice(0, 10),
      prakriti: p.prakriti,
      agni: p.agni,
      koshta: p.koshta,
      notes: p.chiefComplaint || undefined,
    }
  })

  const [extraRecords, setExtraRecords] = React.useState<RecordItem[]>([])
  const records = [...patientRecords, ...extraRecords]
  const [query, setQuery] = React.useState('')
  const [filterAgni, setFilterAgni] = React.useState<string>('all')
  const [filterKoshta, setFilterKoshta] = React.useState<string>('all')
  const [expanded, setExpanded] = React.useState<string | null>(null)

  const filtered = records.filter(r => {
    const matchQuery = [r.id, r.patient, r.therapy, r.date, r.prakriti, r.agni, r.koshta, r.notes ?? '']
      .join(' ').toLowerCase().includes(query.toLowerCase())
    const matchAgni = filterAgni === 'all' || r.agni === filterAgni
    const matchKoshta = filterKoshta === 'all' || r.koshta === filterKoshta
    return matchQuery && matchAgni && matchKoshta
  })

  function addMock() {
    const id = 'REC-' + Math.floor(Math.random() * 9000 + 1000)
    const therapy = MOCK_THERAPIES[Math.floor(Math.random() * MOCK_THERAPIES.length)]
    const prakriti = MOCK_PRAKRITI[Math.floor(Math.random() * MOCK_PRAKRITI.length)]
    const agni = MOCK_AGNI[Math.floor(Math.random() * MOCK_AGNI.length)]
    const koshta = MOCK_KOSHTA[Math.floor(Math.random() * MOCK_KOSHTA.length)]
    setExtraRecords(prev => [...prev, {
      id, patient: 'Demo Patient', therapy,
      date: new Date().toISOString().slice(0, 10),
      prakriti, agni, koshta
    }])
  }

  // Safety alert: Mrudu Koshta patients with Virechana
  const safetyAlerts = records.filter(r => r.koshta === 'Mrudu' && r.therapy === 'Virechana')
  return (
    <div className="min-h-[70vh] flex items-start">
      <div className="container-wide py-10">

        {/* Safety alerts banner */}
        {safetyAlerts.length > 0 && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-bold text-red-800 mb-1">🚨 Safety Alert — Contraindication Detected</p>
            {safetyAlerts.map(r => (
              <p key={r.id} className="text-xs text-red-700">
                Record <strong>{r.id}</strong> ({r.patient}): Virechana prescribed for Mrudu Koshta patient. Review required.
              </p>
            ))}
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="font-serif text-2xl font-bold text-gray-900">Digital Health Records</h1>
            <p className="mt-1 text-sm text-gray-500">Centralized EHR with Ayurvedic parameters — searchable by Prakriti, Agni, Koshta.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="w-52">
              <FormField id="search" label="" type="text" value={query}
                onChange={setQuery} placeholder="Search records..." prefix={<SearchIcon />} />
            </div>
            <select value={filterAgni} onChange={e => setFilterAgni(e.target.value)}
              className="rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-700 outline-none focus:border-amber-500">
              <option value="all">All Agni</option>
              {MOCK_AGNI.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
            <select value={filterKoshta} onChange={e => setFilterKoshta(e.target.value)}
              className="rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-700 outline-none focus:border-amber-500">
              <option value="all">All Koshta</option>
              {MOCK_KOSHTA.map(k => <option key={k} value={k}>{k}</option>)}
            </select>
            <button onClick={addMock} className="btn-outline-amber shrink-0">+ Add mock</button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-amber-100 shadow-card">
          <table className="min-w-full text-sm">
            <thead className="bg-amber-50">
              <tr>
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-amber-800 uppercase tracking-wider">Record ID</th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-amber-800 uppercase tracking-wider">Patient</th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-amber-800 uppercase tracking-wider">Therapy</th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-amber-800 uppercase tracking-wider">Prakriti</th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-amber-800 uppercase tracking-wider">Agni</th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-amber-800 uppercase tracking-wider">Koshta</th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-amber-800 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-amber-800 uppercase tracking-wider">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-50/80 bg-white text-gray-700">
              {filtered.map(r => (
                <React.Fragment key={r.id}>
                  <tr
                    className="hover:bg-amber-50/50 transition-colors duration-150 cursor-pointer"
                    onClick={() => setExpanded(expanded === r.id ? null : r.id)}
                  >
                    <td className="px-4 py-3.5">
                      <span className="font-mono text-xs bg-neutral-100 rounded-md px-2 py-0.5 text-neutral-600">{r.id}</span>
                    </td>
                    <td className="px-4 py-3.5 font-medium">{r.patient}</td>
                    <td className="px-4 py-3.5">
                      <TherapyDot therapy={r.therapy} />{r.therapy}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-xs font-semibold text-amber-700 bg-amber-50 rounded-full px-2 py-0.5">{r.prakriti}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`text-xs font-semibold rounded-full px-2 py-0.5 ${agniColors[r.agni]}`}>{r.agni}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`text-xs font-semibold rounded-full px-2 py-0.5 ${koshtaColors[r.koshta]}`}>{r.koshta}</span>
                    </td>
                    <td className="px-4 py-3.5 text-gray-500">{r.date}</td>
                    <td className="px-4 py-3.5 text-gray-400">{r.notes ?? '—'}</td>
                  </tr>
                  {/* Expanded row — safety check */}
                  {expanded === r.id && (
                    <tr className="bg-amber-50/30">
                      <td colSpan={8} className="px-6 py-4">
                        <div className="flex flex-wrap gap-4 text-xs">
                          <div className="rounded-lg bg-white border border-amber-100 p-3 min-w-[160px]">
                            <p className="text-gray-400 mb-1">Ayurvedic Profile</p>
                            <p><strong>Prakriti:</strong> {r.prakriti}</p>
                            <p><strong>Agni:</strong> {r.agni}</p>
                            <p><strong>Koshta:</strong> {r.koshta}</p>
                          </div>
                          {r.koshta === 'Mrudu' && (
                            <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-red-800">
                              <p className="font-bold mb-1">🚨 Koshta Alert</p>
                              <p>Mrudu Koshta — High-intensity Virechana contraindicated.</p>
                              <p>Use mild Mridu Virechana agents only.</p>
                            </div>
                          )}
                          {r.agni === 'Manda' && (
                            <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-red-800">
                              <p className="font-bold mb-1">🚨 Agni Alert</p>
                              <p>Manda Agni — Avoid heavy ghee doses.</p>
                              <p>Risk of Ama formation with Snehapana.</p>
                            </div>
                          )}
                          {r.koshta !== 'Mrudu' && r.agni !== 'Manda' && (
                            <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-green-800">
                              <p className="font-bold">✓ No contraindications flagged</p>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-16 text-center">
                    <div className="flex flex-col items-center gap-3 text-gray-400">
                      <svg className="w-10 h-10 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <p className="text-sm font-medium">No records found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-gray-400">{filtered.length} record{filtered.length !== 1 ? 's' : ''} shown · Click a row to expand Ayurvedic profile</p>
      </div>
    </div>
  )
}
