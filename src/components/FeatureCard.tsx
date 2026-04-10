import React from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../utils/cn'

export interface FeatureCardProps {
  icon: string | React.ReactNode
  title: string
  description: string
  variant?: 'default' | 'gradient' | 'dark'
  accentColor?: 'amber' | 'forest' | 'blue'
  link?: { href: string; label: string }
  badge?: string
  children?: React.ReactNode
}

const gradientMap = {
  amber: 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100',
  forest: 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-100',
  blue: 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100',
}

const iconBgMap = {
  amber: 'bg-amber-100',
  forest: 'bg-green-100',
  blue: 'bg-blue-100',
}

export function FeatureCard({
  icon, title, description,
  variant = 'default',
  accentColor = 'amber',
  link, badge, children,
}: FeatureCardProps) {
  const base = 'relative rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover'

  const variantClass =
    variant === 'gradient'
      ? cn(gradientMap[accentColor], base)
      : variant === 'dark'
      ? cn('bg-amber-900 text-white border-amber-800', base)
      : cn('bg-white border-[#f0ebe3] shadow-card', base)

  return (
    <div className={variantClass}>
      {badge && (
        <span className="absolute top-4 right-4 text-xs font-semibold bg-amber-500 text-white rounded-full px-2.5 py-0.5">
          {badge}
        </span>
      )}

      <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5', iconBgMap[accentColor])}>
        {icon}
      </div>

      <h3 className={cn('text-lg font-semibold', variant === 'dark' ? 'text-white' : 'text-gray-900')}>
        {title}
      </h3>
      <p className={cn('mt-2 text-sm leading-relaxed', variant === 'dark' ? 'text-amber-100/80' : 'text-gray-500')}>
        {description}
      </p>

      {children && <div className="mt-4">{children}</div>}

      {link && (
        <div className="mt-6">
          <Link to={link.href} className="btn-primary text-sm">
            {link.label}
          </Link>
        </div>
      )}
    </div>
  )
}

export default FeatureCard
