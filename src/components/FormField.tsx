import React from 'react'
import { cn } from '../utils/cn'

export interface FormFieldOption {
  value: string
  label: string
}

export interface FormFieldProps {
  id: string
  label: string
  type?: 'text' | 'email' | 'password' | 'number' | 'date' | 'time' | 'select' | 'textarea'
  value: string | number
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
  options?: FormFieldOption[]
  rows?: number
  hint?: string
  error?: string
  prefix?: React.ReactNode
}

const baseInput = 'w-full rounded-xl border bg-white px-4 py-3 text-sm text-neutral-900 transition-colors duration-150 outline-none'
const focusRing = 'focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500'
const normalBorder = 'border-neutral-200'
const errorBorder = 'border-red-400 focus:ring-red-400/30 focus:border-red-400'

export function FormField({
  id, label, type = 'text', value, onChange,
  placeholder, required, options, rows = 3,
  hint, error, prefix,
}: FormFieldProps) {
  const inputClass = cn(baseInput, focusRing, error ? errorBorder : normalBorder)

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-neutral-700 mb-1.5">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>

      {prefix ? (
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-neutral-400">
            {prefix}
          </div>
          <input
            id={id}
            type={type}
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            required={required}
            className={cn(inputClass, 'pl-10')}
          />
        </div>
      ) : type === 'select' ? (
        <select
          id={id}
          value={value}
          onChange={e => onChange(e.target.value)}
          required={required}
          className={inputClass}
        >
          {options?.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          id={id}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className={inputClass}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={inputClass}
        />
      )}

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      {hint && !error && <p className="text-xs text-neutral-500 mt-1">{hint}</p>}
    </div>
  )
}

export default FormField
