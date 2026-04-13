import React from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../store/appStore.tsx'
import { DoshaClassifier, DietRecommender } from '../utils/mlModels'
import type { PatientFeatures } from '../utils/mlModels'

const statusColors: Record<string, string> = {
  'scheduled':   'bg-blue-100 text-blue-700 border-blue-200',
  'in-progress': 'bg-amber-100 text-amber-700 border-amber-200',
  'completed':   'bg-green-100 text-green-700 border-green-200',
  'cancelled':   'bg-gray-100 text-gray-500 border-gray-200',
}

const statusIcons: Record<string, string> = {
  'scheduled': '📅', 'in-progress': '⚡', 'completed': '✅', 'cancelled': '❌',
}

export default function PatientPortal() {
  const { state } = useApp()
  const { patients, appointments, currentUser } = state

  // Find this patient's record
  const patientId = currentUser?.patientId
  const patient = patients.find(p => p.id === patientId)

  // Their appointments
  const myApts = appointments
    .filter(a => a.patientId === patientId)
    .sort((a, b) => b.date.localeCompare(a.date))

  const today = new Date().toISOString().slice(0, 10)
  const upcomingApts = myApts.filter(a => a.date >= today && a.status === 'scheduled')
  const pastApts = myApts.filter(a => a.status === 'completed' || a.status === 'cancelled' || a.date < today)
  const nextApt = upcomingApts.sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))[0]

  // Generate diet recommendation if patient exists
  const dietPlan = React.useMemo(() => {
    if (!patient) return null
    const features: PatientFeatures = {
      age: patient.age, gender: patient.gender as any,
      height: patient.height, weight: patient.weight,
      sleepHours: patient.sleepHours, stressLevel: patient.stressLevel,
      energyLevel: patient.energyLevel, bodyType: patient.bodyType as any,
      skinType: patient.skinType as any, hairType: 'normal',
      digestion: patient.digestion as any, appetite: patient.appetite as any,
      bowelMovement: patient.bowelMovement as any, tongueCoating: patient.tongueCoating as any,
      prakriti: patient.prakriti, agni: patient.agni,
      koshta: patient.koshta, nadi: patient.nadi,
      sara: patient.sara, satva: patient.satva,
    }
    const dosha = DoshaClassifier.predict(features)
    const allergies = patient.allergies.toLowerCase().split(',').map(a => a.trim()).filter(Boolean)
    return DietRecommender.recommend(dosha, allergies, 'General wellness', patient.agni)
  }, [patient])

  const doshaColors: Record<string, string> = {
    Vata: 'bg-blue-50 border-blue-200 text-blue-800',
    Pitta: 'bg-red-50 border-red-200 text-red-800',
    Kapha: 'bg-green-50 border-green-200 text-green-800',
  }
  const prakritiColor = patient
    ? (Object.keys(doshaColors).find(k => patient.prakriti.includes(k)) ?? 'Vata')
    : 'Vata'

  // Wellness tips based on Agni
  const agniTips: Record<string, string[]> = {
    Samagni:  ['Your digestion is balanced — maintain regular meal times', 'Include all 6 tastes in your daily diet', 'Light exercise like yoga is ideal'],
    Manda:    ['Eat light, warm, easily digestible foods', 'Add Trikatu (ginger, pepper, pippali) to meals', 'Avoid heavy oils and cold foods', 'Walk 15 min after meals'],
    Tikshna:  ['Avoid spicy, sour, and fried foods', 'Include cooling foods like cucumber and coconut', 'Eat at regular intervals — never skip meals'],
    Vishama:  ['Eat at fixed times every day', 'Warm, grounding foods stabilize your digestion', 'Avoid irregular meal patterns and fasting'],
  }

  return (
    <div className="min-h-[70vh] bg-[#fafaf8]">
      <div className="container-wide py-8 max-w-5xl">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold bg-blue-100 text-blue-700 rounded-full px-2.5 py-0.5 uppercase tracking-wider">🌿 Patient Portal</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-gray-900">
              Namaste, {currentUser?.name ?? 'Patient'} 🙏
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <Link to="/diet" className="btn-primary text-sm self-start">View Full Diet Plan →</Link>
        </div>

        {/* Next appointment highlight */}
        {nextApt ? (
          <div className="mb-6 rounded-2xl border-2 border-amber-300 bg-gradient-to-r from-amber-50 to-orange-50 p-5">
            <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-2">📅 Next Appointment</p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="font-serif text-xl font-bold text-gray-900">{nextApt.therapy}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {new Date(nextApt.date + 'T12:00:00').toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })} at {nextApt.time}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">with {nextApt.therapistName} · {nextApt.roomName}</p>
              </div>
              <span className={`text-sm font-semibold rounded-full border px-4 py-1.5 ${statusColors[nextApt.status]}`}>
                {statusIcons[nextApt.status]} {nextApt.status}
              </span>
            </div>
          </div>
        ) : (
          <div className="mb-6 rounded-2xl border border-dashed border-amber-300 bg-amber-50/50 p-5 text-center">
            <p className="text-sm text-amber-700 font-medium">No upcoming appointments</p>
            <p className="text-xs text-gray-400 mt-1">Contact your Ayurvedic center to schedule a session</p>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {/* Health Profile */}
          {patient && (
            <div className="rounded-2xl border border-gray-100 border-t-4 border-t-amber-500 bg-white p-5 shadow-card">
              <h2 className="font-serif text-base font-bold text-gray-900 mb-4">My Health Profile</h2>
              <div className={`rounded-xl border p-3 mb-4 ${doshaColors[prakritiColor]}`}>
                <p className="text-xs font-semibold uppercase tracking-wider mb-1">Prakriti (Body Constitution)</p>
                <p className="font-serif text-2xl font-bold">{patient.prakriti}</p>
                <p className="text-xs mt-1 opacity-70">Your permanent Ayurvedic body type</p>
              </div>
              <div className="space-y-2 text-sm">
                {[
                  { label: 'Agni (Digestive Fire)', value: patient.agni },
                  { label: 'Koshta (Bowel Type)', value: patient.koshta },
                  { label: 'Nadi (Pulse)', value: patient.nadi },
                  { label: 'Age / Gender', value: `${patient.age} yrs · ${patient.gender}` },
                  { label: 'Chief Complaint', value: patient.chiefComplaint },
                ].map(row => (
                  <div key={row.label} className="flex justify-between gap-2">
                    <span className="text-gray-400 text-xs">{row.label}</span>
                    <span className="font-medium text-gray-800 text-xs text-right max-w-[55%]">{row.value}</span>
                  </div>
                ))}
              </div>
              {patient.allergies && patient.allergies !== 'None' && (
                <div className="mt-3 rounded-lg bg-red-50 border border-red-100 px-3 py-2 text-xs text-red-700">
                  ⚠️ Allergies: {patient.allergies}
                </div>
              )}
            </div>
          )}

          {/* My Appointments */}
          <div className="rounded-2xl border border-gray-100 border-t-4 border-t-blue-500 bg-white p-5 shadow-card">
            <h2 className="font-serif text-base font-bold text-gray-900 mb-4">My Appointments</h2>
            {myApts.length === 0 ? (
              <p className="text-sm text-gray-400 py-6 text-center">No appointments yet</p>
            ) : (
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {myApts.map(apt => (
                  <div key={apt.id} className={`rounded-xl border p-3 text-xs ${
                    apt.status === 'completed' ? 'opacity-60' : ''
                  }`}>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-semibold text-gray-900">{apt.therapy}</span>
                      <span className={`rounded-full border px-2 py-0.5 font-medium ${statusColors[apt.status]}`}>
                        {statusIcons[apt.status]} {apt.status}
                      </span>
                    </div>
                    <p className="text-gray-500">{apt.date} at {apt.time}</p>
                    <p className="text-gray-400">{apt.therapistName}</p>
                    {apt.notes && <p className="text-gray-400 italic mt-1">"{apt.notes}"</p>}
                  </div>
                ))}
              </div>
            )}
            <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-xs text-gray-400">
              <span>{upcomingApts.length} upcoming</span>
              <span>{pastApts.length} completed</span>
            </div>
          </div>

          {/* Wellness Tips based on Agni */}
          {patient && (
            <div className="rounded-2xl border border-gray-100 border-t-4 border-t-green-500 bg-white p-5 shadow-card">
              <h2 className="font-serif text-base font-bold text-gray-900 mb-1">Wellness Tips</h2>
              <p className="text-xs text-gray-400 mb-4">Based on your Agni: <strong>{patient.agni}</strong></p>
              <ul className="space-y-2.5">
                {(agniTips[patient.agni] ?? agniTips.Samagni).map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-green-500 shrink-0 mt-0.5">✦</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Diet Recommendations */}
          {dietPlan && (
            <div className="rounded-2xl border border-gray-100 border-t-4 border-t-green-500 bg-white p-5 shadow-card md:col-span-2 lg:col-span-1">
              <h2 className="font-serif text-base font-bold text-gray-900 mb-1">My Diet Plan</h2>
              <p className="text-xs text-gray-400 mb-4">Personalised for {patient?.prakriti} Prakriti</p>

              <div className="mb-3">
                <p className="text-xs font-semibold text-green-700 mb-2">✓ Recommended Foods</p>
                <div className="flex flex-wrap gap-1.5">
                  {dietPlan.foods.slice(0, 6).map((f, i) => (
                    <span key={i} className="text-xs bg-green-50 text-green-700 border border-green-100 rounded-full px-2.5 py-0.5">{f}</span>
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <p className="text-xs font-semibold text-red-600 mb-2">✕ Foods to Avoid</p>
                <div className="flex flex-wrap gap-1.5">
                  {dietPlan.avoid.slice(0, 4).map((f, i) => (
                    <span key={i} className="text-xs bg-red-50 text-red-600 border border-red-100 rounded-full px-2.5 py-0.5">{f}</span>
                  ))}
                </div>
              </div>

              <div className="rounded-lg bg-blue-50 border border-blue-100 p-2.5 text-xs text-blue-800">
                🕐 {dietPlan.timing}
              </div>

              <Link to="/diet" className="btn-primary w-full justify-center mt-3 text-xs">
                Full Diet Planner →
              </Link>
            </div>
          )}

          {/* Therapy Progress */}
          <div className="rounded-2xl border border-gray-100 border-t-4 border-t-purple-500 bg-white p-5 shadow-card">
            <h2 className="font-serif text-base font-bold text-gray-900 mb-4">Therapy Progress</h2>
            <div className="space-y-3">
              {[
                { label: 'Sessions Completed', value: pastApts.filter(a => a.status === 'completed').length, color: 'bg-green-400', max: Math.max(myApts.length, 1) },
                { label: 'Upcoming Sessions', value: upcomingApts.length, color: 'bg-blue-400', max: Math.max(myApts.length, 1) },
              ].map(m => (
                <div key={m.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">{m.label}</span>
                    <span className="font-bold text-gray-900">{m.value}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                    <div className={`h-full rounded-full ${m.color} transition-all`}
                      style={{ width: `${Math.min((m.value / m.max) * 100, 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Therapy types received */}
            {myApts.length > 0 && (
              <div className="mt-4">
                <p className="text-xs text-gray-400 mb-2">Therapies received</p>
                <div className="flex flex-wrap gap-1.5">
                  {[...new Set(myApts.map(a => a.therapy))].map(t => (
                    <span key={t} className="text-xs bg-purple-50 text-purple-700 border border-purple-100 rounded-full px-2.5 py-0.5">{t}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Safety info for patient */}
          {patient && (patient.koshta === 'Mrudu' || patient.agni === 'Manda') && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <h2 className="font-serif text-base font-bold text-amber-900 mb-3">⚠️ Important Health Notes</h2>
              <ul className="space-y-2 text-xs text-amber-800">
                {patient.koshta === 'Mrudu' && (
                  <li className="flex items-start gap-2">
                    <span className="shrink-0">🔴</span>
                    <span>Your Koshta (Mrudu) means your digestive system is sensitive. Always inform your practitioner before any purgation therapy.</span>
                  </li>
                )}
                {patient.agni === 'Manda' && (
                  <li className="flex items-start gap-2">
                    <span className="shrink-0">🔴</span>
                    <span>Your Agni (Manda) means slow digestion. Avoid heavy medicated ghee without practitioner guidance.</span>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
