import React from 'react'
import { useApp } from '../store/appStore.tsx'

export default function Inventory() {
  const { state, updateInventory } = useApp()
  const { inventory, appointments } = state

  const lowStock = inventory.filter(i => i.currentStock <= i.reorderLevel)
  const criticalStock = inventory.filter(i => i.currentStock === 0)

  // Calculate projected usage from upcoming appointments
  const upcomingApts = appointments.filter(a => a.status === 'scheduled' || a.status === 'in-progress')

  const OIL_USAGE: Record<string, string> = {
    'Shirodhara': 'Ksheerabala Tailam',
    'Abhyanga':   'Sesame Oil (Tila Taila)',
    'Pizhichil':  'Ksheerabala Tailam',
    'Basti':      'Ksheerabala Tailam',
    'Virechana':  'Castor Oil (Eranda)',
    'Vamana':     'Madanaphala Yoga',
    'Nasya':      'Sesame Oil (Tila Taila)',
    'Swedana':    'Mustard Oil (Sarshapa)',
  }

  const projectedUsage: Record<string, number> = {}
  upcomingApts.forEach(a => {
    const oil = OIL_USAGE[a.therapy]
    if (oil) projectedUsage[oil] = (projectedUsage[oil] || 0) + 0.5
  })

  return (
    <div className="min-h-[70vh] bg-[#fafaf8]">
      <div className="container-wide py-8">

        <div className="mb-6">
          <h1 className="font-serif text-2xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-sm text-gray-500 mt-1">Depletion-linked tracking — stock levels update automatically with therapy bookings.</p>
        </div>

        {/* Alerts */}
        {criticalStock.length > 0 && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-bold text-red-800 mb-1">🚨 Out of Stock</p>
            {criticalStock.map(i => <p key={i.id} className="text-xs text-red-700">{i.name} — 0{i.unit} remaining. Order immediately.</p>)}
          </div>
        )}
        {lowStock.length > 0 && (
          <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm font-bold text-amber-800 mb-1">⚠️ Low Stock Alert</p>
            {lowStock.map(i => (
              <p key={i.id} className="text-xs text-amber-700">
                {i.name} — {i.currentStock}{i.unit} remaining (reorder at {i.reorderLevel}{i.unit})
              </p>
            ))}
          </div>
        )}

        <div className="grid gap-4">
          {inventory.map(item => {
            const pct = Math.min((item.currentStock / (item.reorderLevel * 4)) * 100, 100)
            const isLow = item.currentStock <= item.reorderLevel
            const isCritical = item.currentStock === 0
            const projected = projectedUsage[item.name] || 0

            return (
              <div key={item.id} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-card">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      {isCritical && <span className="text-xs bg-red-100 text-red-700 rounded-full px-2 py-0.5 font-bold">OUT OF STOCK</span>}
                      {!isCritical && isLow && <span className="text-xs bg-amber-100 text-amber-700 rounded-full px-2 py-0.5 font-bold">LOW STOCK</span>}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <span>Current: <strong className={isCritical ? 'text-red-600' : isLow ? 'text-amber-600' : 'text-green-600'}>{item.currentStock}{item.unit}</strong></span>
                      <span>Reorder at: {item.reorderLevel}{item.unit}</span>
                      {projected > 0 && <span className="text-blue-600">Projected use: {projected}{item.unit}</span>}
                      <span>Updated: {new Date(item.lastUpdated).toLocaleDateString('en-IN')}</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${isCritical ? 'bg-red-500' : isLow ? 'bg-amber-400' : 'bg-green-400'}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => updateInventory(item.id, -0.5)}
                      className="text-xs bg-red-50 text-red-600 border border-red-200 rounded-lg px-3 py-1.5 hover:bg-red-100 font-medium transition-colors">
                      −0.5L
                    </button>
                    <button onClick={() => updateInventory(item.id, 1)}
                      className="text-xs bg-green-50 text-green-700 border border-green-200 rounded-lg px-3 py-1.5 hover:bg-green-100 font-medium transition-colors">
                      +1L
                    </button>
                    <button onClick={() => updateInventory(item.id, 5)}
                      className="text-xs bg-blue-50 text-blue-700 border border-blue-200 rounded-lg px-3 py-1.5 hover:bg-blue-100 font-medium transition-colors">
                      +5L (Restock)
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-6 rounded-xl bg-amber-50 border border-amber-100 p-4 text-xs text-amber-800">
          ✦ Depletion-Linked Tracking: When a therapy session is booked, the system automatically calculates required oil quantities and flags low stock. The 15-minute turnaround buffer also accounts for oil preparation time.
        </div>
      </div>
    </div>
  )
}
