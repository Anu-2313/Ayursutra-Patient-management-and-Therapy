import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { registerSW } from 'virtual:pwa-register'
import './index.css'
import { AppProvider } from './store/appStore.tsx'
import App from './App'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ScheduleDemo from './pages/ScheduleDemo'
import DietPlannerDemo from './pages/DietPlannerDemo'
import RecordsDemo from './pages/RecordsDemo'
import ModelAccuracyHeatmap from './pages/ModelAccuracyHeatmap'
import PatientRegistration from './pages/PatientRegistration'
import TherapyCycle from './pages/TherapyCycle'
import Appointments from './pages/Appointments'
import StaffManagement from './pages/StaffManagement'
import Inventory from './pages/Inventory'
import Analytics from './pages/Analytics'
import PatientPortal from './pages/PatientPortal'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'register', element: <PatientRegistration /> },
      { path: 'schedule', element: <ScheduleDemo /> },
      { path: 'appointments', element: <Appointments /> },
      { path: 'cycle', element: <TherapyCycle /> },
      { path: 'diet', element: <DietPlannerDemo /> },
      { path: 'records', element: <RecordsDemo /> },
      { path: 'staff', element: <StaffManagement /> },
      { path: 'inventory', element: <Inventory /> },
      { path: 'analytics', element: <Analytics /> },
      { path: 'heatmap', element: <ModelAccuracyHeatmap /> },
      { path: 'portal', element: <PatientPortal /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>
)

registerSW({ immediate: true })
