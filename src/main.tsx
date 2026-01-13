import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App'
import Home from './pages/Home'
import Login from './pages/Login'
import ScheduleDemo from './pages/ScheduleDemo'
import DietPlannerDemo from './pages/DietPlannerDemo'
import RecordsDemo from './pages/RecordsDemo'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'schedule', element: <ScheduleDemo /> },
      { path: 'diet', element: <DietPlannerDemo /> },
      { path: 'records', element: <RecordsDemo /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
