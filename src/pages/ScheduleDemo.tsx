import React from 'react'
import { TherapyRecommender, DoshaClassifier, PatientFeatures, DoshaPrediction, TherapyRecommendation } from '../utils/mlModels'
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

const doshaStyle: Record<string, { bg: string; text: string; label: string }> = {
  vata:  { bg: 'bg-blue-50',  text: 'text-blue-700',  label: 'Vata' },
  pitta: { bg: 'bg-red-50',   text: 'text-red-700',   label: 'Pitta' },
  kapha: { bg: 'bg-green-50', text: 'text-green-700', label: 'Kapha' },
}

export default function ScheduleDemo() {
  const [patientName, setPatientName] = React.useState('')
  const [patientFeatures, setPatientFeatures] = React.useState<Partial<PatientFeatures>>({
    age: 30, gender: 'male', height: 170, weight: 70,
    sleepHours: 7, stressLevel: 5, digestion: 'good', appetite: 'moderate',
    bodyType: 'mesomorph', skinType: 'normal', hairType: 'normal',
    energyLevel: 6, bowelMovement: 'regular', tongueCoating: 'none'
  })
  const [symptoms, setSymptoms] = React.useState('')
  const [date, setDate] = React.useState<string>(() => new Date().toISOString().slice(0, 10))
  const [time, setTime] = React.useState('10:00')
  const [notes, setNotes] = React.useState('')
  const [recommendations, setRecommendations] = React.useState<TherapyRecommendation[]>([])
  const [doshaPrediction, setDoshaPrediction] = React.useState<DoshaPrediction | null>(null)
  const [showAdvanced, setShowAdvanced] = React.useState(false)
  const [scheduled, setScheduled] = React.useState<null | {
    id: string; patient: string; therapy: string; date: string; time: string; confidence: number
  }>(null)

  function generateRecommendations() {
    const features = patientFeatures as PatientFeatures
    const doshaPred = DoshaClassifier.predict(features)
    setDoshaPrediction(doshaPred)
    const symptomList = symptoms.toLowerCase().split(',').map(s => s.trim()).filter(Boolean)
    setRecommendations(TherapyRecommender.recommend(doshaPred, symptomList))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    generateRecommendations()
  }

  function bookSession(therapy: string, confidence: number) {
    const id = Math.random().toString(36).slice(2, 8).toUpperCase()
    setScheduled({ id, patient: patientName, therapy, date, time, confidence })
  }

  return (
    <div className="min-h-[70vh] flex items-start bg-[#fafaf8]">
      <div className="container-wide py-10 grid gap-8 md:grid-cols-2">

        {/* Form panel */}
        <div className="rounded-2xl border border-gray-100 border-t-4 border-t-amber-500 bg-white p-7 shadow-card">
          <div className="flex items-center justify-between mb-1">
            <h1 className="font-serif text-xl font-bold text-gray-900">ML-powered Therapy Scheduler</h1>
            <button type="button" onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-xs font-semibold text-amber-700 hover:text-amber-900 border border-amber-200 rounded-full px-3 py-1 transition-colors">
              {showAdvanced ? 'Simple' : 'Advanced'}
            </button>
          </div>
          <p className="text-xs text-gray-400 mb-6">AI therapy recommendations · {Math.round(TherapyRecommender.getAccuracy() * 100)}% accuracy</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField id="patient" label="Patient name" type="text" value={patientName}
              onChange={setPatientName} placeholder="e.g. S. Sharma" required />

            {showAdvanced && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <FormField id="age" label="Age" type="number" value={patientFeatures.age ?? 30}
                    onChange={v => setPatientFeatures({ ...patientFeatures, age: parseInt(v) })} />
                  <FormField id="gender" label="Gender" type="select" value={patientFeatures.gender ?? 'male'}
                    onChange={v => setPatientFeatures({ ...patientFeatures, gender: v as any })}
                    options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }, { value: 'other', label: 'Other' }]} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField id="sleepHours" label="Sleep Hours" type="number" value={patientFeatures.sleepHours ?? 7}
                    onChange={v => setPatientFeatures({ ...patientFeatures, sleepHours: parseInt(v) })} />
                  <FormField id="stressLevel" label="Stress (1–10)" type="number" value={patientFeatures.stressLevel ?? 5}
                    onChange={v => setPatientFeatures({ ...patientFeatures, stressLevel: parseInt(v) })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField id="digestion" label="Digestion" type="select" value={patientFeatures.digestion ?? 'good'}
                    onChange={v => setPatientFeatures({ ...patientFeatures, digestion: v as any })}
                    options={[{ value: 'excellent', label: 'Excellent' }, { value: 'good', label: 'Good' }, { value: 'fair', label: 'Fair' }, { value: 'poor', label: 'Poor' }]} />
                  <FormField id="bodyType" label="Body Type" type="select" value={patientFeatures.bodyType ?? 'mesomorph'}
                    onChange={v => setPatientFeatures({ ...patientFeatures, bodyType: v as any })}
                    options={[{ value: 'ectomorph', label: 'Ectomorph' }, { value: 'mesomorph', label: 'Mesomorph' }, { value: 'endomorph', label: 'Endomorph' }]} />
                </div>
              </>
            )}

            <FormField id="symptoms" label="Symptoms (comma-separated)" type="text" value={symptoms}
              onChange={setSymptoms} placeholder="e.g. stress, joint pain, headache" />

            <div className="grid grid-cols-2 gap-4">
              <FormField id="date" label="Date" type="date" value={date} onChange={setDate} />
              <FormField id="time" label="Time" type="time" value={time} onChange={setTime} />
            </div>

            <FormField id="notes" label="Notes (optional)" type="textarea" value={notes}
              onChange={setNotes} placeholder="Allergies, preferences, or physician instructions" rows={3} />

            <button type="submit" className="btn-primary w-full justify-center">
              Get ML Recommendations
            </button>
          </form>
        </div>

        {/* Results panel */}
        <div className="rounded-2xl border border-gray-100 border-t-4 border-t-amber-500 bg-white p-7 shadow-card">
          <h2 className="font-serif text-xl font-bold text-gray-900 mb-1">AI Therapy Recommendations</h2>
          <p className="text-xs text-gray-400 mb-5">Fill the form to see personalized recommendations</p>

          {recommendations.length === 0 && !scheduled && (
            <div className="flex flex-col items-center justify-center py-16 text-gray-300">
              <svg className="w-12 h-12 mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-sm text-gray-400">No recommendations yet</p>
            </div>
          )}

          {recommendations.length > 0 && (
            <div className="space-y-5">
              {/* Dosha card */}
              {doshaPrediction && (() => {
                const style = doshaStyle[doshaPrediction.primary] ?? doshaStyle.vata
                return (
                  <div className={`rounded-xl ${style.bg} p-4 border border-opacity-20`}>
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
                    <ConfidenceBar confidence={doshaPrediction.confidence} color={doshaPrediction.primary === 'vata' ? 'blue' : doshaPrediction.primary === 'pitta' ? 'red' : 'green'} />
                    <p className="text-xs text-gray-400 mt-2">Model accuracy: {Math.round(DoshaClassifier.getAccuracy() * 100)}%</p>
                  </div>
                )
              })()}

              {/* Therapy recommendations */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-700">Recommended Therapies</h3>
                {recommendations.map((rec: TherapyRecommendation, i: number) => (
                  <div key={i} className="rounded-xl border border-gray-100 p-4 bg-gray-50/50">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{rec.therapy}</h4>
                        <p className="mt-1 text-xs text-gray-500 leading-relaxed">{rec.reasoning}</p>
                        <p className="mt-1.5 text-xs text-gray-400">{rec.duration} · {rec.frequency}</p>
                      </div>
                    </div>
                    <ConfidenceBar confidence={rec.confidence} />
                    <button onClick={() => bookSession(rec.therapy, rec.confidence)}
                      className="btn-forest mt-3 text-xs">
                      Book This Therapy
                    </button>
                  </div>
                ))}
              </div>

              {/* ML metrics */}
              <div className="rounded-xl bg-amber-50/60 border border-amber-100 p-4">
                <h3 className="text-xs font-semibold text-amber-800 mb-2">ML Model Metrics</h3>
                <div className="space-y-1 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Therapy model accuracy</span>
                    <span className="font-semibold">{Math.round(TherapyRecommender.getAccuracy() * 100)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Expert validation score</span>
                    <span className="font-semibold">{Math.round(TherapyRecommender.getMetrics().expertValidationScore * 100)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Training cases</span>
                    <span className="font-semibold">{TherapyRecommender.getMetrics().trainingCases}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Booking confirmation */}
          {scheduled && (
            <div className="mt-5 rounded-xl border-2 border-green-200 bg-green-50 p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold">✓</span>
                <h3 className="text-sm font-semibold text-green-900">Booking Confirmed</h3>
              </div>
              <div className="space-y-1 text-sm text-gray-700">
                <div className="flex justify-between"><span className="text-gray-500">Ref</span><span className="font-mono font-semibold">{scheduled.id}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Patient</span><span>{scheduled.patient}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Therapy</span><span>{scheduled.therapy}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Date</span><span>{scheduled.date}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Time</span><span>{scheduled.time}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">ML Confidence</span><span className="font-semibold text-green-700">{Math.round(scheduled.confidence * 100)}%</span></div>
                {notes && <div className="flex justify-between"><span className="text-gray-500">Notes</span><span className="text-right max-w-[60%]">{notes}</span></div>}
              </div>
              <div className="mt-4 flex gap-2">
                <button className="btn-outline-amber text-xs">Reschedule</button>
                <button className="btn-forest text-xs">Notify Patient</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
