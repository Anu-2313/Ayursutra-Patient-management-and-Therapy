// AyurSutra — Global App Store (localStorage-backed)
// Provides persistent state across page refreshes without a backend

import React from 'react'
import type { AgniState, KoshtaType, PrakritiType, NadiType, SaraType, SatvaType } from '../utils/mlModels'

// ── Types ─────────────────────────────────────────────────────────────────────

export interface Patient {
  id: string
  name: string
  phone: string
  age: number
  gender: 'male' | 'female' | 'other'
  height: number
  weight: number
  comorbidities: string
  allergies: string
  chiefComplaint: string
  bodyType: string
  skinType: string
  sleepHours: number
  stressLevel: number
  energyLevel: number
  digestion: string
  appetite: string
  bowelMovement: string
  tongueCoating: string
  prakriti: PrakritiType
  agni: AgniState
  koshta: KoshtaType
  nadi: NadiType
  sara: SaraType
  satva: SatvaType
  registeredAt: string
}

export interface Appointment {
  id: string
  patientId: string
  patientName: string
  therapy: string
  date: string
  time: string
  therapistId: string
  therapistName: string
  roomId: string
  roomName: string
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
  confidence: number
  agni: AgniState
  koshta: KoshtaType
  prakriti: PrakritiType
  notes: string
  createdAt: string
}

export interface Therapist {
  id: string
  name: string
  specializations: string[]
  available: boolean
  shift: 'morning' | 'afternoon' | 'full'
}

export interface Room {
  id: string
  name: string
  type: string
  available: boolean
  lastCleaned?: string
}

export interface InventoryStock {
  id: string
  name: string
  currentStock: number
  reorderLevel: number
  unit: string
  lastUpdated: string
}

export interface AppState {
  patients: Patient[]
  appointments: Appointment[]
  therapists: Therapist[]
  rooms: Room[]
  inventory: InventoryStock[]
  currentUser: { name: string; role: 'admin' | 'practitioner' | 'therapist' | 'patient'; patientId?: string } | null
}

// ── Default seed data ─────────────────────────────────────────────────────────

const DEFAULT_THERAPISTS: Therapist[] = [
  { id: 'TH-001', name: 'Dr. Priya Nair',    specializations: ['Abhyanga', 'Shirodhara', 'Nasya'],    available: true, shift: 'morning' },
  { id: 'TH-002', name: 'Dr. Rajan Menon',   specializations: ['Basti', 'Virechana', 'Vamana'],       available: true, shift: 'morning' },
  { id: 'TH-003', name: 'Kavita Sharma',     specializations: ['Abhyanga', 'Pizhichil', 'Swedana'],   available: true, shift: 'afternoon' },
  { id: 'TH-004', name: 'Suresh Pillai',     specializations: ['Pizhichil', 'Shirodhara', 'Swedana'], available: false, shift: 'afternoon' },
  { id: 'TH-005', name: 'Dr. Anita Desai',   specializations: ['Nasya', 'Basti', 'Abhyanga'],         available: true, shift: 'full' },
]

const DEFAULT_ROOMS: Room[] = [
  { id: 'RM-01', name: 'Therapy Room 1', type: 'General',    available: true,  lastCleaned: new Date().toISOString() },
  { id: 'RM-02', name: 'Therapy Room 2', type: 'General',    available: true,  lastCleaned: new Date().toISOString() },
  { id: 'RM-03', name: 'Shirodhara Suite', type: 'Shirodhara', available: false, lastCleaned: new Date().toISOString() },
]

const DEFAULT_INVENTORY: InventoryStock[] = [
  { id: 'INV-001', name: 'Ksheerabala Tailam',    currentStock: 8.5,  reorderLevel: 2.0, unit: 'L', lastUpdated: new Date().toISOString() },
  { id: 'INV-002', name: 'Sesame Oil (Tila Taila)', currentStock: 12.0, reorderLevel: 3.0, unit: 'L', lastUpdated: new Date().toISOString() },
  { id: 'INV-003', name: 'Coconut Oil (Narikela)',  currentStock: 1.2,  reorderLevel: 2.0, unit: 'L', lastUpdated: new Date().toISOString() },
  { id: 'INV-004', name: 'Castor Oil (Eranda)',     currentStock: 3.0,  reorderLevel: 1.0, unit: 'L', lastUpdated: new Date().toISOString() },
  { id: 'INV-005', name: 'Mustard Oil (Sarshapa)',  currentStock: 5.5,  reorderLevel: 2.0, unit: 'L', lastUpdated: new Date().toISOString() },
  { id: 'INV-006', name: 'Madanaphala Yoga',        currentStock: 0.8,  reorderLevel: 1.0, unit: 'L', lastUpdated: new Date().toISOString() },
]

const DEFAULT_PATIENTS: Patient[] = [
  {
    id: 'PAT-A1B2C', name: 'Ananya Verma', phone: '+91 98765 43210', age: 34, gender: 'female',
    height: 162, weight: 58, comorbidities: 'Mild hypertension', allergies: 'None',
    chiefComplaint: 'Chronic stress and insomnia', bodyType: 'ectomorph', skinType: 'dry',
    sleepHours: 5, stressLevel: 8, energyLevel: 4, digestion: 'fair', appetite: 'moderate',
    bowelMovement: 'irregular', tongueCoating: 'thin',
    prakriti: 'Vata', agni: 'Vishama', koshta: 'Madhya', nadi: 'Vata-Nadi', sara: 'Madhyama', satva: 'Madhyama',
    registeredAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'PAT-D3E4F', name: 'Suresh Mehta', phone: '+91 87654 32109', age: 45, gender: 'male',
    height: 175, weight: 82, comorbidities: 'Type 2 Diabetes', allergies: 'Dairy',
    chiefComplaint: 'Joint pain and stiffness', bodyType: 'endomorph', skinType: 'oily',
    sleepHours: 7, stressLevel: 6, energyLevel: 5, digestion: 'good', appetite: 'strong',
    bowelMovement: 'constipated', tongueCoating: 'thick',
    prakriti: 'Kapha', agni: 'Manda', koshta: 'Krura', nadi: 'Kapha-Nadi', sara: 'Avara', satva: 'Madhyama',
    registeredAt: new Date(Date.now() - 86400000 * 7).toISOString(),
  },
  {
    id: 'PAT-G5H6I', name: 'Priya Nambiar', phone: '+91 76543 21098', age: 28, gender: 'female',
    height: 158, weight: 52, comorbidities: 'None', allergies: 'Sesame',
    chiefComplaint: 'Skin inflammation and acidity', bodyType: 'mesomorph', skinType: 'oily',
    sleepHours: 6, stressLevel: 7, energyLevel: 7, digestion: 'excellent', appetite: 'strong',
    bowelMovement: 'loose', tongueCoating: 'yellow',
    prakriti: 'Pitta', agni: 'Tikshna', koshta: 'Mrudu', nadi: 'Pitta-Nadi', sara: 'Pravara', satva: 'Pravara',
    registeredAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
]

const DEFAULT_APPOINTMENTS: Appointment[] = [
  {
    id: 'APT-001', patientId: 'PAT-A1B2C', patientName: 'Ananya Verma',
    therapy: 'Shirodhara', date: new Date().toISOString().slice(0, 10), time: '09:00',
    therapistId: 'TH-001', therapistName: 'Dr. Priya Nair',
    roomId: 'RM-03', roomName: 'Shirodhara Suite',
    status: 'scheduled', confidence: 0.85,
    agni: 'Vishama', koshta: 'Madhya', prakriti: 'Vata',
    notes: 'Patient reports improved sleep after last session',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'APT-002', patientId: 'PAT-D3E4F', patientName: 'Suresh Mehta',
    therapy: 'Abhyanga', date: new Date().toISOString().slice(0, 10), time: '11:00',
    therapistId: 'TH-003', therapistName: 'Kavita Sharma',
    roomId: 'RM-01', roomName: 'Therapy Room 1',
    status: 'in-progress', confidence: 0.78,
    agni: 'Manda', koshta: 'Krura', prakriti: 'Kapha',
    notes: 'Manda Agni — using light sesame oil, reduced pressure',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'APT-003', patientId: 'PAT-G5H6I', patientName: 'Priya Nambiar',
    therapy: 'Nasya', date: new Date().toISOString().slice(0, 10), time: '14:00',
    therapistId: 'TH-005', therapistName: 'Dr. Anita Desai',
    roomId: 'RM-02', roomName: 'Therapy Room 2',
    status: 'scheduled', confidence: 0.72,
    agni: 'Tikshna', koshta: 'Mrudu', prakriti: 'Pitta',
    notes: 'Mrudu Koshta noted — avoid Virechana',
    createdAt: new Date().toISOString(),
  },
]

// ── Storage helpers ───────────────────────────────────────────────────────────

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch { return fallback }
}

function save<T>(key: string, value: T): void {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
}

// ── Context ───────────────────────────────────────────────────────────────────

interface AppContextValue {
  state: AppState
  addPatient: (p: Patient) => void
  addAppointment: (a: Appointment) => void
  updateAppointmentStatus: (id: string, status: Appointment['status']) => void
  cancelAppointment: (id: string) => void
  updateInventory: (id: string, delta: number) => void
  toggleTherapistAvailability: (id: string) => void
  toggleRoomAvailability: (id: string) => void
  login: (name: string, role: 'admin' | 'practitioner' | 'therapist' | 'patient', patientId?: string) => void
  logout: () => void
  // Conflict resolution
  checkConflict: (therapistId: string, roomId: string, date: string, time: string, excludeId?: string) => { hasConflict: boolean; reason: string }
}

export const AppContext = React.createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [patients, setPatients] = React.useState<Patient[]>(() =>
    load('ayursutra_patients', DEFAULT_PATIENTS))
  const [appointments, setAppointments] = React.useState<Appointment[]>(() =>
    load('ayursutra_appointments', DEFAULT_APPOINTMENTS))
  const [therapists, setTherapists] = React.useState<Therapist[]>(() =>
    load('ayursutra_therapists', DEFAULT_THERAPISTS))
  const [rooms, setRooms] = React.useState<Room[]>(() =>
    load('ayursutra_rooms', DEFAULT_ROOMS))
  const [inventory, setInventory] = React.useState<InventoryStock[]>(() =>
    load('ayursutra_inventory', DEFAULT_INVENTORY))
  const [currentUser, setCurrentUser] = React.useState<AppState['currentUser']>(() =>
    load('ayursutra_user', null))

  // Persist on change
  React.useEffect(() => { save('ayursutra_patients', patients) }, [patients])
  React.useEffect(() => { save('ayursutra_appointments', appointments) }, [appointments])
  React.useEffect(() => { save('ayursutra_therapists', therapists) }, [therapists])
  React.useEffect(() => { save('ayursutra_rooms', rooms) }, [rooms])
  React.useEffect(() => { save('ayursutra_inventory', inventory) }, [inventory])
  React.useEffect(() => { save('ayursutra_user', currentUser) }, [currentUser])

  const state: AppState = { patients, appointments, therapists, rooms, inventory, currentUser }

  // Conflict resolution — 15-min turnaround constant
  function checkConflict(therapistId: string, roomId: string, date: string, time: string, excludeId?: string) {
    const TURNAROUND_MINUTES = 15
    const [h, m] = time.split(':').map(Number)
    const slotStart = h * 60 + m
    const slotEnd = slotStart + 60 + TURNAROUND_MINUTES // 60min session + 15min buffer

    const conflicts = appointments.filter(a =>
      a.id !== excludeId &&
      a.date === date &&
      a.status !== 'cancelled' &&
      (a.therapistId === therapistId || a.roomId === roomId)
    )

    for (const c of conflicts) {
      const [ch, cm] = c.time.split(':').map(Number)
      const cStart = ch * 60 + cm
      const cEnd = cStart + 60 + TURNAROUND_MINUTES
      if (slotStart < cEnd && slotEnd > cStart) {
        const who = c.therapistId === therapistId
          ? `therapist ${c.therapistName}`
          : `room ${c.roomName}`
        return {
          hasConflict: true,
          reason: `Conflict: ${who} is already booked at ${c.time} (includes 15-min turnaround buffer)`
        }
      }
    }
    return { hasConflict: false, reason: '' }
  }

  function addPatient(p: Patient) { setPatients(prev => [p, ...prev]) }

  function addAppointment(a: Appointment) { setAppointments(prev => [a, ...prev]) }

  function updateAppointmentStatus(id: string, status: Appointment['status']) {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a))
  }

  function cancelAppointment(id: string) {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'cancelled' } : a))
  }

  function updateInventory(id: string, delta: number) {
    setInventory(prev => prev.map(i =>
      i.id === id ? { ...i, currentStock: Math.max(0, i.currentStock + delta), lastUpdated: new Date().toISOString() } : i
    ))
  }

  function toggleTherapistAvailability(id: string) {
    setTherapists(prev => prev.map(t => t.id === id ? { ...t, available: !t.available } : t))
  }

  function toggleRoomAvailability(id: string) {
    setRooms(prev => prev.map(r => r.id === id ? { ...r, available: !r.available } : r))
  }

  function login(name: string, role: 'admin' | 'practitioner' | 'therapist' | 'patient', patientId?: string) {
    setCurrentUser({ name, role, patientId })
  }

  function logout() { setCurrentUser(null) }

  return (
    <AppContext.Provider value={{
      state, addPatient, addAppointment, updateAppointmentStatus,
      cancelAppointment, updateInventory, toggleTherapistAvailability,
      toggleRoomAvailability, login, logout, checkConflict
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = React.useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
