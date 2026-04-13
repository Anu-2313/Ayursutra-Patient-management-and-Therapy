import React from 'react'
import FormField from '../components/FormField'
import {
  TherapyCycleGenerator, ContraindicationEngine,
  type TherapyCycle, type PrakritiType, type AgniState, type KoshtaType
} from '../utils/mlModels'

const PRAKRITI_OPTIONS = [
  { value: 'Vata', label: 'Vata' }, { value: 'Pitta', label: 'Pitta' },
  { value: 'Kapha', label: 'Kapha' }, { value: 'Vata-Pitta', label: 'Vata-Pitta' },
  { value: 'Pitta-Kapha', label: 'Pitta-Kapha' }, { value: 'Vata-Kapha', label: 'Vata-Kapha' },
  { value: 'Tridosha', label: 'Tridosha' },
]
const AGNI_OPTIONS = [
  { value: 'Samagni', label: 'Samagni (Balanced)' }, { value: 'Manda', label: 'Manda (Slow)' },
  { value: 'Tikshna', label: 'Tikshna (Sharp)' }, { value: 'Vishama', label: 'Vishama (Irregular)' },
]
const KOSHTA_OPTIONS = [
  { value: 'Madhya', label: 'Madhya (Moderate)' },
  { value: 'Krura', label: 'Krura (Hard)' },
  { value: 'Mrudu', label: 'Mrudu (Sensitive)' },
]

const phaseColors: Record<string, string> = {
  Purvakarma:    'bg-blue-50 border-blue-200 text-blue-800',
  Pradhanakarma: 'bg-amber-50 border-amber-200 text-amber-800',
  Paschatkarma:  'bg-green-50 border-green-200 text-green-800',
}

const phaseDot: Record<string, string> = {
  Purvakarma:    'bg-blue-400',
  Pradhanakarma: 'bg-amber-500',
  Paschatkarma:  'bg-green-500',
}

export default function TherapyCycle() {
  const [patientName, setPatientName] = React.useState('')
  const [prakriti, setPrakriti] = React.useState<PrakritiType>('Vata')
  const [agni, setAgni] = React.useState<AgniState>('Samagni')
  const [koshta, setKoshta] = React.useState<KoshtaType>('Madhya')
  const [startDate, setStartDate] = React.useState(() => new Date().toISOString().slice(0, 10))
  const [cycleDays, setCycleDays] = React.useState<7 | 14>(7)
  const [cycle, setCycle] = React.useState<TherapyCycle | null>(null)
  const [activeDay, setActiveDay] = React.useState<number | null>(null)

  function generate(e: React.FormEvent) {
    e.preventDefault()
    const result = TherapyCycleGenerator.generate(patientName, prakriti, agni, koshta, startDate, cycleDays)
    setCycle(result)
    setActiveDay(1)
  }

  const selectedDay = cycle?.days.find(d => d.day === activeDay)

  // Contraindication check for selected day's therapy
  const alerts = selectedDay
    ? ContraindicationEngine.check(selectedDay.therapy, agni, koshta, prakriti)
    : []

  return (
    <div className="min-h-[70vh] bg-[#fafaf8]">
      <div className="container-wide py-10">
        <div className="mb-8">
          <span className="stat-badge mb-2">Multi-Day Scheduling</span>
          <h1 className="font-serif text-3xl font-bold text-gray-900 mt-2">Panchakarma Therapy Cycle Planner</h1>
          <p className="text-sm text-gray-500 mt-1">
            Generates a complete Purvakarma → Pradhanakarma → Paschatkarma cycle with inventory tracking and contraindication alerts.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">

          {/* ── Input Panel ── */}
          <div className="rounded-2xl border border-gray-100 border-t-4 border-t-amber-500 bg-white p-6 shadow-card">
            <h2 className="font-serif text-lg font-bold text-gray-900 mb-4">Cycle Parameters</h2>
            <form onSubmit={generate} className="space-y-4">
              <FormField id="pname" label="Patient Name" type="text" value={patientName}
                onChange={setPatientName} placeholder="e.g. R. Mehta" required />

              <FormField id="prakriti" label="Prakriti" type="select" value={prakriti}
                onChange={v => setPrakriti(v as PrakritiType)} options={PRAKRITI_OPTIONS} />

              <FormField id="agni" label="Agni State" type="select" value={agni}
                onChange={v => setAgni(v as AgniState)} options={AGNI_OPTIONS} />

              <FormField id="koshta" label="Koshta Type" type="select" value={koshta}
                onChange={v => setKoshta(v as KoshtaType)} options={KOSHTA_OPTIONS} />

              <FormField id="startDate" label="Cycle Start Date" type="date" value={startDate}
                onChange={setStartDate} />

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Cycle Duration</label>
                <div className="flex gap-3">
                  {([7, 14] as const).map(d => (
                    <button key={d} type="button"
                      onClick={() => setCycleDays(d)}
                      className={`flex-1 rounded-xl border py-2.5 text-sm font-semibold transition-all ${
                        cycleDays === d
                          ? 'border-amber-500 bg-amber-50 text-amber-800'
                          : 'border-gray-200 text-gray-500 hover:border-amber-300'
                      }`}>
                      {d} Days
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" className="btn-primary w-full justify-center">
                Generate Cycle Plan →
              </button>
            </form>

            {/* Phase legend */}
            <div className="mt-6 space-y-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Phases</p>
              {Object.entries(phaseDot).map(([phase, dot]) => (
                <div key={phase} className="flex items-center gap-2 text-xs text-gray-600">
                  <span className={`w-2.5 h-2.5 rounded-full ${dot}`} />
                  {phase}
                </div>
              ))}
            </div>
          </div>

          {/* ── Timeline ── */}
          <div className="rounded-2xl border border-gray-100 border-t-4 border-t-amber-500 bg-white p-6 shadow-card">
            <h2 className="font-serif text-lg font-bold text-gray-900 mb-4">
              {cycle ? `${cycle.totalDays}-Day Cycle — ${cycle.patientName}` : 'Cycle Timeline'}
            </h2>

            {!cycle && (
              <div className="flex flex-col items-center justify-center py-16 text-gray-300">
                <svg className="w-12 h-12 mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm text-gray-400">Generate a cycle to see the timeline</p>
              </div>
            )}

            {cycle && (
              <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
                {cycle.days.map(day => (
                  <button key={day.day} onClick={() => setActiveDay(day.day)}
                    className={`w-full text-left rounded-xl border p-3 transition-all ${
                      activeDay === day.day
                        ? 'border-amber-400 bg-amber-50 shadow-sm'
                        : 'border-gray-100 hover:border-amber-200 hover:bg-amber-50/40'
                    }`}>
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${phaseDot[day.phase]}`}>
                        {day.day}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-900 truncate">{day.therapy}</span>
                          {day.therapistsRequired > 1 && (
                            <span className="text-xs bg-purple-100 text-purple-700 rounded-full px-1.5 py-0.5 shrink-0">
                              ×{day.therapistsRequired} therapists
                            </span>
                          )}
                        </div>
                        <span className={`text-xs font-medium px-1.5 py-0.5 rounded border ${phaseColors[day.phase]}`}>
                          {day.phase}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 shrink-0">{day.duration}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Day Detail + Inventory ── */}
          <div className="space-y-5">

            {/* Day detail */}
            <div className="rounded-2xl border border-gray-100 border-t-4 border-t-amber-500 bg-white p-6 shadow-card">
              <h2 className="font-serif text-lg font-bold text-gray-900 mb-4">Day Detail</h2>

              {!selectedDay && (
                <p className="text-sm text-gray-400 py-8 text-center">Select a day from the timeline</p>
              )}

              {selectedDay && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${phaseDot[selectedDay.phase]}`}>
                      {selectedDay.day}
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900">{selectedDay.therapy}</p>
                      <p className="text-xs text-gray-400">{selectedDay.phase}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded-lg bg-gray-50 p-2.5">
                      <p className="text-gray-400">Duration</p>
                      <p className="font-semibold text-gray-800">{selectedDay.duration}</p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-2.5">
                      <p className="text-gray-400">Therapists</p>
                      <p className="font-semibold text-gray-800">{selectedDay.therapistsRequired} required</p>
                    </div>
                    {selectedDay.oil && (
                      <div className="rounded-lg bg-amber-50 p-2.5 col-span-2">
                        <p className="text-amber-600">Oil / Medicine</p>
                        <p className="font-semibold text-amber-900">{selectedDay.oil}</p>
                        <p className="text-amber-600">{selectedDay.oilQuantityLiters}L required</p>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-gray-500 bg-gray-50 rounded-lg p-3 leading-relaxed">
                    {selectedDay.notes}
                  </p>

                  {/* Contraindication alerts */}
                  {alerts.length > 0 && (
                    <div className="space-y-2">
                      {alerts.map((alert, i) => (
                        <div key={i} className={`rounded-xl border p-3 text-xs ${
                          alert.severity === 'critical' ? 'bg-red-50 border-red-200' :
                          alert.severity === 'warning'  ? 'bg-amber-50 border-amber-200' :
                          'bg-blue-50 border-blue-200'
                        }`}>
                          <div className="flex items-center gap-1.5 font-bold mb-1">
                            <span>{alert.severity === 'critical' ? '🚨' : alert.severity === 'warning' ? '⚠️' : 'ℹ️'}</span>
                            <span className={
                              alert.severity === 'critical' ? 'text-red-800' :
                              alert.severity === 'warning'  ? 'text-amber-800' : 'text-blue-800'
                            }>
                              {alert.severity.toUpperCase()} — {alert.therapy}
                            </span>
                          </div>
                          <p className={`mb-1 ${alert.severity === 'critical' ? 'text-red-700' : alert.severity === 'warning' ? 'text-amber-700' : 'text-blue-700'}`}>
                            {alert.reason}
                          </p>
                          <p className="text-gray-600 font-medium">→ {alert.recommendation}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {alerts.length === 0 && (
                    <div className="rounded-xl bg-green-50 border border-green-200 p-3 text-xs text-green-800">
                      ✓ No contraindications detected for this therapy with current Agni/Koshta/Prakriti profile.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Inventory panel */}
            {cycle && cycle.inventoryRequired.length > 0 && (
              <div className="rounded-2xl border border-gray-100 border-t-4 border-t-amber-500 bg-white p-6 shadow-card">
                <h2 className="font-serif text-base font-bold text-gray-900 mb-3">
                  Inventory Required
                  <span className="ml-2 text-xs font-normal text-gray-400">Depletion-Linked Tracking</span>
                </h2>
                <div className="space-y-2">
                  {cycle.inventoryRequired.map((item, i) => (
                    <div key={i} className="rounded-xl border border-gray-100 bg-gray-50 p-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                          <p className="text-xs text-gray-500">Required: <strong>{item.quantityLiters}L</strong> · Reorder at: {item.reorderLevel}L</p>
                        </div>
                        <span className={`text-xs font-bold rounded-full px-2 py-0.5 ${
                          item.quantityLiters > item.reorderLevel * 2
                            ? 'bg-red-100 text-red-700'
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {item.quantityLiters}L
                        </span>
                      </div>
                      {item.alert && (
                        <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-2 py-1 mt-2">
                          ⚠️ {item.alert}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
