import React from 'react'
import {
  DoshaClassifier, DietRecommender,
  type PatientFeatures, type DoshaPrediction, type DietRecommendation,
  type AgniState, type KoshtaType, type PrakritiType
} from '../utils/mlModels'
import FormField from '../components/FormField'

function ConfidenceBar({ confidence, color = 'amber' }: { confidence: number; color?: string }) {
  return (
    <div className="mt-3">
      <div className="flex justify-between text-xs text-neutral-500 mb-1">
        <span>Confidence</span>
        <span className="font-semibold">{Math.round(confidence * 100)}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-neutral-100 overflow-hidden">
        <div
          className={`h-full rounded-full bg-${color}-500 transition-[width] duration-[600ms] ease-out`}
          style={{ width: `${Math.round(confidence * 100)}%` }}
        />
      </div>
    </div>
  )
}

const doshaStyle: Record<string, { bg: string; text: string }> = {
  vata:  { bg: 'bg-blue-50',  text: 'text-blue-700' },
  pitta: { bg: 'bg-red-50',   text: 'text-red-700' },
  kapha: { bg: 'bg-green-50', text: 'text-green-700' },
}

const AGNI_OPTIONS = [
  { value: 'Samagni', label: 'Samagni — Balanced' },
  { value: 'Manda',   label: 'Manda — Slow/Weak' },
  { value: 'Tikshna', label: 'Tikshna — Sharp/Intense' },
  { value: 'Vishama', label: 'Vishama — Irregular' },
]
const KOSHTA_OPTIONS = [
  { value: 'Madhya', label: 'Madhya — Moderate' },
  { value: 'Krura',  label: 'Krura — Hard' },
  { value: 'Mrudu',  label: 'Mrudu — Sensitive' },
]
const PRAKRITI_OPTIONS = [
  { value: 'Vata', label: 'Vata' }, { value: 'Pitta', label: 'Pitta' },
  { value: 'Kapha', label: 'Kapha' }, { value: 'Vata-Pitta', label: 'Vata-Pitta' },
  { value: 'Pitta-Kapha', label: 'Pitta-Kapha' }, { value: 'Vata-Kapha', label: 'Vata-Kapha' },
  { value: 'Tridosha', label: 'Tridosha' },
]

const agniGuidance: Record<AgniState, { note: string; color: string }> = {
  Samagni:  { note: 'Balanced Agni — standard diet applies.', color: 'text-green-700 bg-green-50 border-green-200' },
  Manda:    { note: 'Manda Agni — avoid heavy oils/ghee. Add Trikatu (ginger, pepper, pippali) to stimulate digestion.', color: 'text-red-700 bg-red-50 border-red-200' },
  Tikshna:  { note: 'Tikshna Agni — avoid spicy/sour foods. Include cooling, sweet foods to pacify sharp Agni.', color: 'text-amber-700 bg-amber-50 border-amber-200' },
  Vishama:  { note: 'Vishama Agni — eat at fixed times. Warm, grounding foods stabilize irregular Agni.', color: 'text-amber-700 bg-amber-50 border-amber-200' },
}

export default function DietPlannerDemo() {
  const [patientFeatures, setPatientFeatures] = React.useState<Partial<PatientFeatures>>({
    age: 30, gender: 'male', height: 170, weight: 70,
    sleepHours: 7, stressLevel: 5, digestion: 'good', appetite: 'moderate',
    bodyType: 'mesomorph', skinType: 'normal', hairType: 'normal',
    energyLevel: 6, bowelMovement: 'regular', tongueCoating: 'none',
    prakriti: 'Vata', agni: 'Samagni', koshta: 'Madhya',
    nadi: 'Vata-Nadi', sara: 'Madhyama', satva: 'Madhyama',
  })
  const [allergies, setAllergies] = React.useState('')
  const [goal, setGoal] = React.useState('Balance digestion')
  const [plan, setPlan] = React.useState<DietRecommendation | null>(null)
  const [doshaPrediction, setDoshaPrediction] = React.useState<DoshaPrediction | null>(null)
  const [showAdvanced, setShowAdvanced] = React.useState(false)

  function pf<K extends keyof PatientFeatures>(key: K, value: PatientFeatures[K]) {
    setPatientFeatures(prev => ({ ...prev, [key]: value }))
  }

  function generatePlan() {
    const features = patientFeatures as PatientFeatures
    const doshaPred = DoshaClassifier.predict(features)
    setDoshaPrediction(doshaPred)
    const allergyList = allergies.toLowerCase().split(',').map(a => a.trim()).filter(Boolean)
    setPlan(DietRecommender.recommend(doshaPred, allergyList, goal, features.agni))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    generatePlan()
  }

  const agni = (patientFeatures.agni || 'Samagni') as AgniState
  const agniGuide = agniGuidance[agni]

  return (
    <div className="min-h-[70vh] flex items-start bg-[#fafaf8]">
      <div className="container-wide py-10 grid gap-8 md:grid-cols-2">

        {/* ── Form panel ── */}
        <div className="rounded-2xl border border-gray-100 border-t-4 border-t-amber-500 bg-white p-7 shadow-card">
          <div className="flex items-center justify-between mb-1">
            <h1 className="font-serif text-xl font-bold text-gray-900">ML-powered Diet Planner</h1>
            <button type="button" onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-xs font-semibold text-amber-700 hover:text-amber-900 border border-amber-200 rounded-full px-3 py-1 transition-colors">
              {showAdvanced ? 'Simple' : 'Advanced'}
            </button>
          </div>
          <p className="text-xs text-gray-400 mb-6">Personalized meal suggestions · {Math.round(DietRecommender.getAccuracy() * 100)}% accuracy</p>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* ── Ayurvedic Diagnostic Parameters ── */}
            <div className="rounded-xl bg-amber-50 border border-amber-100 p-4 space-y-3">
              <p className="text-xs font-semibold text-amber-800 uppercase tracking-wider">Ayurvedic Diagnostic Parameters</p>
              <div className="grid grid-cols-3 gap-3">
                <FormField id="prakriti" label="Prakriti" type="select"
                  value={patientFeatures.prakriti || 'Vata'}
                  onChange={v => pf('prakriti', v as PrakritiType)}
                  options={PRAKRITI_OPTIONS} />
                <FormField id="agni" label="Agni" type="select"
                  value={patientFeatures.agni || 'Samagni'}
                  onChange={v => pf('agni', v as AgniState)}
                  options={AGNI_OPTIONS} />
                <FormField id="koshta" label="Koshta" type="select"
                  value={patientFeatures.koshta || 'Madhya'}
                  onChange={v => pf('koshta', v as KoshtaType)}
                  options={KOSHTA_OPTIONS} />
              </div>
              {/* Live Agni guidance */}
              <div className={`rounded-lg border px-3 py-2 text-xs font-medium ${agniGuide.color}`}>
                <span className="font-bold">Agni ({agni}): </span>{agniGuide.note}
              </div>
            </div>

            {showAdvanced && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <FormField id="age" label="Age" type="number" value={patientFeatures.age ?? 30}
                    onChange={v => pf('age', parseInt(v))} />
                  <FormField id="gender" label="Gender" type="select" value={patientFeatures.gender ?? 'male'}
                    onChange={v => pf('gender', v as any)}
                    options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }, { value: 'other', label: 'Other' }]} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField id="height" label="Height (cm)" type="number" value={patientFeatures.height ?? 170}
                    onChange={v => pf('height', parseInt(v))} />
                  <FormField id="weight" label="Weight (kg)" type="number" value={patientFeatures.weight ?? 70}
                    onChange={v => pf('weight', parseInt(v))} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField id="sleepHours" label="Sleep Hours" type="number" value={patientFeatures.sleepHours ?? 7}
                    onChange={v => pf('sleepHours', parseInt(v))} />
                  <FormField id="stressLevel" label="Stress (1–10)" type="number" value={patientFeatures.stressLevel ?? 5}
                    onChange={v => pf('stressLevel', parseInt(v))} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField id="digestion" label="Digestion" type="select" value={patientFeatures.digestion ?? 'good'}
                    onChange={v => pf('digestion', v as any)}
                    options={[{ value: 'excellent', label: 'Excellent' }, { value: 'good', label: 'Good' }, { value: 'fair', label: 'Fair' }, { value: 'poor', label: 'Poor' }]} />
                  <FormField id="bodyType" label="Body Type" type="select" value={patientFeatures.bodyType ?? 'mesomorph'}
                    onChange={v => pf('bodyType', v as any)}
                    options={[{ value: 'ectomorph', label: 'Ectomorph' }, { value: 'mesomorph', label: 'Mesomorph' }, { value: 'endomorph', label: 'Endomorph' }]} />
                </div>
              </>
            )}

            <FormField id="goal" label="Goal" type="text" value={goal}
              onChange={setGoal} placeholder="e.g. Improve sleep, balance digestion" />
            <FormField id="allergies" label="Allergies (comma-separated)" type="text" value={allergies}
              onChange={setAllergies} placeholder="e.g. dairy, coconut" />

            <button type="submit" className="btn-primary w-full justify-center">
              Generate ML-powered Plan
            </button>
          </form>
        </div>

        {/* ── Results panel ── */}
        <div className="rounded-2xl border border-gray-100 border-t-4 border-t-amber-500 bg-white p-7 shadow-card">
          <h2 className="font-serif text-xl font-bold text-gray-900 mb-1">ML Recommendations</h2>
          <p className="text-xs text-gray-400 mb-5">Agni-aware diet plan with Samsarjana Krama guidance</p>

          {!plan && (
            <div className="flex flex-col items-center justify-center py-16 text-gray-300">
              <svg className="w-12 h-12 mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-sm text-gray-400">No plan generated yet</p>
            </div>
          )}

          {plan && (
            <div className="space-y-4">
              {/* Dosha card */}
              {doshaPrediction && (() => {
                const style = doshaStyle[doshaPrediction.primary] ?? doshaStyle.vata
                return (
                  <div className={`rounded-xl ${style.bg} p-4`}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-sm font-semibold ${style.text}`}>Predicted Dosha Profile</h3>
                      <span className={`text-xs font-bold ${style.text} bg-white/60 rounded-full px-2.5 py-0.5`}>
                        {doshaPrediction.primary.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex gap-4 text-xs text-gray-600 mb-2">
                      <span>Vata <strong>{Math.round(doshaPrediction.vata * 100)}%</strong></span>
                      <span>Pitta <strong>{Math.round(doshaPrediction.pitta * 100)}%</strong></span>
                      <span>Kapha <strong>{Math.round(doshaPrediction.kapha * 100)}%</strong></span>
                    </div>
                    <ConfidenceBar confidence={doshaPrediction.confidence}
                      color={doshaPrediction.primary === 'vata' ? 'blue' : doshaPrediction.primary === 'pitta' ? 'red' : 'green'} />
                    <p className="text-xs text-gray-400 mt-2">
                      Agni: <strong>{agni}</strong> · Koshta: <strong>{patientFeatures.koshta}</strong>
                    </p>
                  </div>
                )
              })()}

              {/* Agni-specific guidance */}
              {agni !== 'Samagni' && (
                <div className={`rounded-xl border p-3 text-xs font-medium ${agniGuide.color}`}>
                  <span className="font-bold">Agni Adjustment ({agni}): </span>{agniGuide.note}
                </div>
              )}

              {/* Recommended foods */}
              <div className="rounded-xl bg-green-50 border border-green-100 p-4">
                <h3 className="text-sm font-semibold text-green-800 mb-2">Recommended Foods</h3>
                <ul className="space-y-1">
                  {plan.foods.map((food: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-green-500 text-xs">✓</span>{food}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Foods to avoid */}
              <div className="rounded-xl bg-red-50 border border-red-100 p-4">
                <h3 className="text-sm font-semibold text-red-800 mb-2">Foods to Avoid</h3>
                <ul className="space-y-1">
                  {plan.avoid.map((food: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-red-400 text-xs">✕</span>{food}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Meal timing */}
              <div className="rounded-xl bg-blue-50 border border-blue-100 p-4">
                <h3 className="text-sm font-semibold text-blue-800 mb-1">Meal Timing & Samsarjana Krama</h3>
                <p className="text-sm text-gray-700">{plan.timing}</p>
              </div>

              {/* Confidence */}
              <div className="rounded-xl bg-amber-50/60 border border-amber-100 p-4">
                <h3 className="text-xs font-semibold text-amber-800 mb-1">ML Confidence</h3>
                <ConfidenceBar confidence={plan.confidence} />
                <p className="text-xs text-gray-400 mt-2">Diet model accuracy: {Math.round(DietRecommender.getAccuracy() * 100)}%</p>
              </div>

              <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <strong>Reasoning:</strong> {plan.reasoning}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
