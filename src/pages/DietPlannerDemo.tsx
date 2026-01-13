import React from 'react'

export default function DietPlannerDemo() {
  const [dosha, setDosha] = React.useState<'Vata' | 'Pitta' | 'Kapha'>('Vata')
  const [allergies, setAllergies] = React.useState('')
  const [goal, setGoal] = React.useState('Balance digestion')
  const [plan, setPlan] = React.useState<string[] | null>(null)

  function generatePlan() {
    const base: Record<string, string[]> = {
      Vata: ['Warm kitchari', 'Ghee-roasted vegetables', 'Golden milk'],
      Pitta: ['Cucumber quinoa bowl', 'Coconut raita', 'Mint-lime infusion'],
      Kapha: ['Moong dal soup', 'Steamed greens with lemon', 'Ginger tea'],
    }
    const items = base[dosha].filter(item =>
      allergies
        .toLowerCase()
        .split(',')
        .map(a => a.trim())
        .filter(Boolean)
        .every(a => !item.toLowerCase().includes(a))
    )
    const annotated = items.map(i => `${i} — for ${goal}`)
    setPlan(annotated.length ? annotated : ['No suitable items after filtering allergies'])
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    generatePlan()
  }

  return (
    <div className="min-h-[70vh] flex items-start">
      <div className="container-wide py-10 grid gap-8 md:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-gray-900">AI-powered Diet Planner (Demo)</h1>
          <p className="mt-1 text-sm text-gray-600">Personalized meal suggestions based on dosha and preferences.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="dosha" className="block text-sm font-medium text-gray-700">Primary dosha</label>
              <select id="dosha" value={dosha} onChange={(e) => setDosha(e.target.value as any)}
                      className="mt-1 w-full rounded-md border-gray-300 focus:border-brand-600 focus:ring-brand-600">
                {['Vata','Pitta','Kapha'].map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="goal" className="block text-sm font-medium text-gray-700">Goal</label>
              <input id="goal" value={goal} onChange={(e) => setGoal(e.target.value)}
                     className="mt-1 w-full rounded-md border-gray-300 focus:border-brand-600 focus:ring-brand-600" placeholder="e.g. Improve sleep" />
            </div>

            <div>
              <label htmlFor="allergies" className="block text-sm font-medium text-gray-700">Allergies (comma-separated)</label>
              <input id="allergies" value={allergies} onChange={(e) => setAllergies(e.target.value)}
                     className="mt-1 w-full rounded-md border-gray-300 focus:border-brand-600 focus:ring-brand-600" placeholder="e.g. dairy, coconut" />
            </div>

            <button type="submit" className="btn-primary w-full justify-center">Generate plan</button>
          </form>
        </div>

        <div className="rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">Suggested meals</h2>
          {!plan ? (
            <p className="mt-3 text-sm text-gray-600">Fill the form to see recommendations.</p>
          ) : (
            <ul className="mt-4 list-disc pl-5 text-sm text-gray-700 space-y-2">
              {plan.map((p, i) => (<li key={i}>{p}</li>))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
