'use client'

import Link from 'next/link'
import { useAccent } from '@/components/AccentProvider'

export default function NotFound() {
  const { accent } = useAccent()
  return (
    <div style={{ minHeight: 'calc(100vh - 56px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' }}>
      <h1 style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 'clamp(5rem, 20vw, 10rem)', fontWeight: 700, color: accent, lineHeight: 1, marginBottom: 16, opacity: 0.15 }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text)', marginBottom: 12 }}>Page not found</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: 32, maxWidth: 360 }}>The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
      <Link href="/" style={{ padding: '10px 24px', borderRadius: 10, border: `1px solid ${accent}`, background: `color-mix(in srgb, ${accent} 10%, transparent)`, color: accent, fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>
        ← Back Home
      </Link>
    </div>
  )
}
