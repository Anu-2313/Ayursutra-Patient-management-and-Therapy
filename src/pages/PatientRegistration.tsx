import React from 'react'
import { useNavigate } from 'react-router-dom'
import FormField from '../components/FormField'
import type { PatientFeatures, AgniState, KoshtaType, PrakritiType, NadiType, SaraType, SatvaType } from '../utils/mlModels'
import { useApp } from '../store/appStore.tsx'

// ── Structured Input Method (SIM) — classical Ayurvedic taxonomy ──────────────
const PRAKRITI_OPTIONS = [
  { value: 'Vata',       label: 'Vata — Thin, dry, anxious, creative' },
  { value: 'Pitta',      label: 'Pitta — Medium, sharp, intense, focused' },
  { value: 'Kapha',      label: 'Kapha — Heavy, calm, stable, slow' },
  { value: 'Vata-Pitta', label: 'Vata-Pitta — Dual constitution' },
  { value: 'Pitta-Kapha',label: 'Pitta-Kapha — Dual constitution' },
  { value: 'Vata-Kapha', label: 'Vata-Kapha — Dual constitution' },
  { value: 'Tridosha',   label: 'Tridosha — Equal all three' },
]

const AGNI_OPTIONS = [
  { value: 'Samagni',  label: 'Samagni — Balanced digestive fire (ideal)' },
  { value: 'Manda',    label: 'Manda — Slow/weak digestive fire' },
  { value: 'Tikshna',  label: 'Tikshna — Sharp/intense digestive fire' },
  { value: 'Vishama',  label: 'Vishama — Irregular/variable digestive fire' },
]

const KOSHTA_OPTIONS = [
  { value: 'Madhya', label: 'Madhya — Moderate bowel (normal)' },
  { value: 'Krura',  label: 'Krura — Hard/constipated bowel' },
  { value: 'Mrudu',  label: 'Mrudu — Sensitive/loose bowel' },
]

const NADI_OPTIONS = [
  { value: 'Vata-Nadi',  label: 'Vata Nadi — Irregular, thin, fast pulse' },
  { value: 'Pitta-Nadi', label: 'Pitta Nadi — Sharp, jumping, moderate pulse' },
  { value: 'Kapha-Nadi', label: 'Kapha Nadi — Slow, broad, steady pulse' },
  { value: 'Mixed',      label: 'Mixed — Combined pulse pattern' },
]

const SARA_OPTIONS = [
  { value: 'Pravara',  label: 'Pravara — Excellent tissue quality' },
  { value: 'Madhyama', label: 'Madhyama — Moderate tissue quality' },
  { value: 'Avara',    label: 'Avara — Poor tissue quality' },
]

const SATVA_OPTIONS = [
  { value: 'Pravara',  label: 'Pravara — Strong mental constitution' },
  { value: 'Madhyama', label: 'Madhyama — Moderate mental constitution' },
  { value: 'Avara',    label: 'Avara — Weak mental constitution' },
]

type FormState = Omit<PatientFeatures, 'prakriti' | 'agni' | 'koshta' | 'nadi' | 'sara' | 'satva'> & {
  prakriti: PrakritiType
  agni: AgniState
  koshta: KoshtaType
  nadi: NadiType
  sara: SaraType
  satva: SatvaType
  // Extra registration fields
  name: string
  phone: string
  comorbidities: string
  allergies: string
  chiefComplaint: string
}

const defaultForm: FormState = {
  name: '', phone: '', comorbidities: '', allergies: '', chiefComplaint: '',
  age: 30, gender: 'male', height: 165, weight: 65,
  sleepHours: 7, stressLevel: 5, energyLevel: 6,
  bodyType: 'mesomorph', skinType: 'normal', hairType: 'normal',
  digestion: 'good', appetite: 'moderate',
  bowelMovement: 'regular', tongueCoating: 'none',
  // Ayurvedic Diagnostic Layer (SIM)
  prakriti: 'Vata', agni: 'Samagni', koshta: 'Madhya',
  nadi: 'Vata-Nadi', sara: 'Madhyama', satva: 'Madhyama',
}

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-4 mt-6 first:mt-0">
      <h3 className="font-serif text-base font-bold text-gray-900">{title}</h3>
      {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
      <div className="h-px bg-amber-100 mt-2" />
    </div>
  )
}

function AlertBadge({ label, color }: { label: string; color: 'amber' | 'red' | 'blue' }) {
  const cls = {
    amber: 'bg-amber-50 border-amber-200 text-amber-800',
    red:   'bg-red-50 border-red-200 text-red-800',
    blue:  'bg-blue-50 border-blue-200 text-blue-700',
  }[color]
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${cls}`}>
      {label}
    </span>
  )
}

export default function PatientRegistration() {
  const navigate = useNavigate()
  const { addPatient } = useApp()
  const [form, setForm] = React.useState<FormState>(defaultForm)
  const [submitted, setSubmitted] = React.useState(false)
  const [patientId] = React.useState(() => 'PAT-' + Math.random().toString(36).slice(2, 7).toUpperCase())

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    addPatient({
      id: patientId,
      name: form.name, phone: form.phone, age: form.age, gender: form.gender,
      height: form.height, weight: form.weight, comorbidities: form.comorbidities,
      allergies: form.allergies, chiefComplaint: form.chiefComplaint,
      bodyType: form.bodyType, skinType: form.skinType, sleepHours: form.sleepHours,
      stressLevel: form.stressLevel, energyLevel: form.energyLevel,
      digestion: form.digestion, appetite: form.appetite,
      bowelMovement: form.bowelMovement, tongueCoating: form.tongueCoating,
      prakriti: form.prakriti, agni: form.agni, koshta: form.koshta,
      nadi: form.nadi, sara: form.sara, satva: form.satva,
      registeredAt: new Date().toISOString(),
    })
    setSubmitted(true)
  }

  // Agni clinical risk note
  const agniRisk: Record<AgniState, { label: string; color: 'amber' | 'red' | 'blue' }> = {
    Samagni:  { label: 'Balanced Agni — No restrictions', color: 'blue' },
    Manda:    { label: 'Manda Agni — Avoid heavy ghee doses', color: 'red' },
    Tikshna:  { label: 'Tikshna Agni — Avoid spicy/sour foods', color: 'amber' },
    Vishama:  { label: 'Vishama Agni — Fixed meal times required', color: 'amber' },
  }

  const koshtaRisk: Record<KoshtaType, { label: string; color: 'amber' | 'red' | 'blue' }> = {
    Madhya: { label: 'Madhya Koshta — Standard protocols apply', color: 'blue' },
    Krura:  { label: 'Krura Koshta — Requires stronger Virechana prep', color: 'amber' },
    Mrudu:  { label: 'Mrudu Koshta — High-intensity Virechana CONTRAINDICATED', color: 'red' },
  }

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#fafaf8] px-4">
        <div className="w-full max-w-lg rounded-2xl border border-green-200 bg-white p-8 shadow-card text-center">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✓</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-1">Patient Registered</h2>
          <p className="text-sm text-gray-500 mb-6">Longitudinal Patient Record (LPR) created successfully.</p>

          <div className="rounded-xl bg-amber-50 border border-amber-100 p-5 text-left space-y-2 mb-6">
            <div className="flex justify-between text-sm"><span className="text-gray-500">Patient ID</span><span className="font-mono font-bold text-amber-800">{patientId}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Name</span><span className="font-medium">{form.name}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Prakriti</span><span className="font-semibold text-amber-700">{form.prakriti}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Agni</span><span className="font-semibold">{form.agni}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Koshta</span><span className="font-semibold">{form.koshta}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Nadi</span><span className="font-semibold">{form.nadi}</span></div>
          </div>

          <div className="flex flex-col gap-2">
            <button onClick={() => navigate('/records')} className="btn-primary w-full justify-center">
              View Patient Records →
            </button>
            <button onClick={() => navigate('/schedule')} className="btn-outline-amber w-full justify-center">
              Schedule Therapy
            </button>
            <button onClick={() => { setSubmitted(false); setForm(defaultForm) }} className="text-xs text-gray-400 hover:text-gray-600 mt-1">
              Register Another Patient
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[70vh] bg-[#fafaf8]">
      <div className="container-wide py-10 max-w-4xl">
        <div className="mb-8">
          <span className="stat-badge mb-2">Patient Registration</span>
          <h1 className="font-serif text-3xl font-bold text-gray-900 mt-2">New Patient Intake</h1>
          <p className="text-sm text-gray-500 mt-1">
            Captures both Demographic/Allopathic and Ayurvedic Diagnostic layers to create a Longitudinal Patient Record (LPR).
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">

          {/* ── Left Column ── */}
          <div className="rounded-2xl border border-gray-100 border-t-4 border-t-amber-500 bg-white p-7 shadow-card space-y-4">

            <SectionHeading title="Demographic & Allopathic Layer" subtitle="Basic vitals, allergies, comorbidities" />

            <FormField id="name" label="Full Name" type="text" value={form.name}
              onChange={v => set('name', v)} placeholder="e.g. Sunita Sharma" required />

            <div className="grid grid-cols-2 gap-4">
              <FormField id="age" label="Age" type="number" value={form.age}
                onChange={v => set('age', parseInt(v))} required />
              <FormField id="gender" label="Gender" type="select" value={form.gender}
                onChange={v => set('gender', v as any)}
                options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }, { value: 'other', label: 'Other' }]} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField id="height" label="Height (cm)" type="number" value={form.height}
                onChange={v => set('height', parseInt(v))} />
              <FormField id="weight" label="Weight (kg)" type="number" value={form.weight}
                onChange={v => set('weight', parseInt(v))} />
            </div>

            <FormField id="phone" label="Phone" type="text" value={form.phone}
              onChange={v => set('phone', v)} placeholder="+91 XXXXX XXXXX" />

            <FormField id="comorbidities" label="Comorbidities / Medical History" type="textarea"
              value={form.comorbidities} onChange={v => set('comorbidities', v)}
              placeholder="e.g. Hypertension, Diabetes Type 2" rows={2} />

            <FormField id="allergies" label="Known Allergies" type="text" value={form.allergies}
              onChange={v => set('allergies', v)} placeholder="e.g. dairy, sesame oil" />

            <FormField id="chiefComplaint" label="Chief Complaint" type="textarea"
              value={form.chiefComplaint} onChange={v => set('chiefComplaint', v)}
              placeholder="Primary reason for seeking Panchakarma therapy" rows={2} required />

            <SectionHeading title="Physical Characteristics" />

            <div className="grid grid-cols-2 gap-4">
              <FormField id="bodyType" label="Body Type (Deha Prakriti)" type="select" value={form.bodyType}
                onChange={v => set('bodyType', v as any)}
                options={[{ value: 'ectomorph', label: 'Ectomorph (Vata)' }, { value: 'mesomorph', label: 'Mesomorph (Pitta)' }, { value: 'endomorph', label: 'Endomorph (Kapha)' }]} />
              <FormField id="skinType" label="Skin Type" type="select" value={form.skinType}
                onChange={v => set('skinType', v as any)}
                options={[{ value: 'dry', label: 'Dry' }, { value: 'oily', label: 'Oily' }, { value: 'normal', label: 'Normal' }, { value: 'combination', label: 'Combination' }]} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField id="sleepHours" label="Sleep Hours/Night" type="number" value={form.sleepHours}
                onChange={v => set('sleepHours', parseInt(v))} />
              <FormField id="stressLevel" label="Stress Level (1–10)" type="number" value={form.stressLevel}
                onChange={v => set('stressLevel', parseInt(v))} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField id="energyLevel" label="Energy Level (1–10)" type="number" value={form.energyLevel}
                onChange={v => set('energyLevel', parseInt(v))} />
              <FormField id="appetite" label="Appetite" type="select" value={form.appetite}
                onChange={v => set('appetite', v as any)}
                options={[{ value: 'strong', label: 'Strong' }, { value: 'moderate', label: 'Moderate' }, { value: 'weak', label: 'Weak' }]} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField id="bowelMovement" label="Bowel Movement" type="select" value={form.bowelMovement}
                onChange={v => set('bowelMovement', v as any)}
                options={[{ value: 'regular', label: 'Regular' }, { value: 'irregular', label: 'Irregular' }, { value: 'constipated', label: 'Constipated' }, { value: 'loose', label: 'Loose' }]} />
              <FormField id="tongueCoating" label="Tongue Coating" type="select" value={form.tongueCoating}
                onChange={v => set('tongueCoating', v as any)}
                options={[{ value: 'none', label: 'None' }, { value: 'thin', label: 'Thin' }, { value: 'thick', label: 'Thick' }, { value: 'white', label: 'White' }, { value: 'yellow', label: 'Yellow' }]} />
            </div>
          </div>

          {/* ── Right Column — Ayurvedic Diagnostic Layer ── */}
          <div className="rounded-2xl border border-gray-100 border-t-4 border-t-amber-500 bg-white p-7 shadow-card space-y-4">

            <SectionHeading
              title="Ayurvedic Diagnostic Layer"
              subtitle="Structured Input Method (SIM) — classical taxonomy enforced for data uniformity"
            />

            <div className="rounded-xl bg-amber-50 border border-amber-100 p-3 text-xs text-amber-800">
              ✦ These parameters enable Clinical Decision Support (CDSS) and contraindication alerts. All fields use standardized Ayurvedic terminology per NAMASTE portal standards.
            </div>

            {/* Prakriti */}
            <div>
              <FormField id="prakriti" label="Prakriti (Body Constitution — permanent)" type="select"
                value={form.prakriti} onChange={v => set('prakriti', v as PrakritiType)}
                options={PRAKRITI_OPTIONS} />
              <p className="text-xs text-gray-400 mt-1">Foundation of all therapy decisions. Determines oil selection, temperature, and intensity.</p>
            </div>

            {/* Agni */}
            <div>
              <FormField id="agni" label="Agni (Digestive Fire State)" type="select"
                value={form.agni} onChange={v => set('agni', v as AgniState)}
                options={AGNI_OPTIONS} />
              <div className="mt-1.5">
                <AlertBadge label={agniRisk[form.agni].label} color={agniRisk[form.agni].color} />
              </div>
              <p className="text-xs text-gray-400 mt-1">Critical for Snehapana dosing. Manda Agni risks Ama formation with heavy ghee.</p>
            </div>

            {/* Koshta */}
            <div>
              <FormField id="koshta" label="Koshta (Gastrointestinal Motility)" type="select"
                value={form.koshta} onChange={v => set('koshta', v as KoshtaType)}
                options={KOSHTA_OPTIONS} />
              <div className="mt-1.5">
                <AlertBadge label={koshtaRisk[form.koshta].label} color={koshtaRisk[form.koshta].color} />
              </div>
              <p className="text-xs text-gray-400 mt-1">Determines Virechana intensity. Mrudu Koshta requires mild agents only — safety critical.</p>
            </div>

            {/* Nadi Pariksha */}
            <div>
              <FormField id="nadi" label="Nadi Pariksha (Pulse Examination)" type="select"
                value={form.nadi} onChange={v => set('nadi', v as NadiType)}
                options={NADI_OPTIONS} />
              <p className="text-xs text-gray-400 mt-1">Part of Dashavidha Pariksha (ten-fold examination). Confirms Dosha dominance.</p>
            </div>

            {/* Sara & Satva */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <FormField id="sara" label="Sara (Tissue Quality)" type="select"
                  value={form.sara} onChange={v => set('sara', v as SaraType)}
                  options={SARA_OPTIONS} />
              </div>
              <div>
                <FormField id="satva" label="Satva (Mental Strength)" type="select"
                  value={form.satva} onChange={v => set('satva', v as SatvaType)}
                  options={SATVA_OPTIONS} />
              </div>
            </div>

            <SectionHeading title="Data Uniformity Summary" subtitle="Structured Input Method ensures 100% terminological uniformity" />

            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 space-y-2">
              {[
                { label: 'Prakriti', value: form.prakriti, std: 'NAMASTE Standard' },
                { label: 'Agni', value: form.agni, std: 'Classical 4-state taxonomy' },
                { label: 'Koshta', value: form.koshta, std: 'Classical 3-state taxonomy' },
                { label: 'Nadi', value: form.nadi, std: 'Dashavidha Pariksha' },
                { label: 'Sara', value: form.sara, std: 'Tridosha grading' },
                { label: 'Satva', value: form.satva, std: 'Manas Prakriti' },
              ].map(row => (
                <div key={row.label} className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 w-16">{row.label}</span>
                  <span className="font-semibold text-amber-800 flex-1 text-center">{row.value}</span>
                  <span className="text-gray-400 text-right">{row.std}</span>
                </div>
              ))}
            </div>

            <button type="submit" className="btn-primary w-full justify-center mt-2">
              Register Patient & Create LPR →
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
