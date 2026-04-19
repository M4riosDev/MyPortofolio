'use client'

import { useAccent } from '@/components/AccentProvider'

export default function ProjectsPage() {
  const { accent } = useAccent()

  return (
    <div style={{ minHeight: 'calc(100vh - 56px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px' }}>
      <div className="card" style={{ maxWidth: 640, width: '100%', textAlign: 'center' }}>
        <span style={{ display: 'inline-block', fontFamily: 'var(--font-jetbrains)', fontSize: '0.8rem', color: accent, letterSpacing: '0.1em', marginBottom: 12 }}>
          {'// projects'}
        </span>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--text)', letterSpacing: '-1px', marginBottom: 10 }}>
          This page is under maintenence
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Check back soon for updates.
        </p>
      </div>
    </div>
  )
}
