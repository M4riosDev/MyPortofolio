'use client'

import { useEffect, useRef } from 'react'
import { useAccent } from '@/components/AccentProvider'

export default function HomePage() {
  const typedRef = useRef<HTMLSpanElement>(null)
  const { accent, nextAccent } = useAccent()

  useEffect(() => {
    let typedInstance: any
    const init = async () => {
      const { default: Typed } = await import('typed.js')
      typedInstance = new Typed(typedRef.current!, {
        strings: ['Discord Bot Developer', 'Web Developer', 'JavaScript Engineer', 'Open Source Contributor'],
        loop: true,
        typeSpeed: 70,
        backSpeed: 40,
        backDelay: 1800,
      })
    }
    init()
    return () => typedInstance?.destroy()
  }, [])

  return (
    <section
      style={{
        minHeight: 'calc(100vh - 56px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 24px',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: 720 }}>
        <div
          style={{
            display: 'inline-block',
            background: `color-mix(in srgb, var(--accent) 12%, transparent)`,
            border: `1px solid color-mix(in srgb, var(--accent) 30%, transparent)`,
            borderRadius: 100,
            padding: '4px 16px',
            fontSize: '0.8rem',
            fontFamily: 'var(--font-jetbrains)',
            color: 'var(--accent)',
            marginBottom: 24,
            letterSpacing: '0.05em',
          }}
        >
          $ whoami
        </div>

        <h1
          onClick={nextAccent}
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            fontWeight: 700,
            color: 'var(--text)',
            letterSpacing: '-2px',
            lineHeight: 1.1,
            cursor: 'pointer',
            marginBottom: 16,
          }}
          title="Click to change color theme"
        >
          {"Hi! I'm "}
          <span style={{ color: 'var(--accent)' }}>Marios</span>
        </h1>

        <p
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            color: 'var(--text-muted)',
            fontWeight: 400,
            marginBottom: 40,
            minHeight: 36,
          }}
        >
          {"I'm a "}
          <span ref={typedRef} style={{ color: 'var(--accent)', fontWeight: 600 }} />
        </p>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            {
              href: 'https://discord.com/users/930463180189204561',
              label: 'Discord',
              svg: 'M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.102 18.08.114 18.1.132 18.11a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z',
            },
            {
              href: 'https://github.com/M4riosDev',
              label: 'GitHub',
              svg: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z',
            },
            {
              href: 'mailto:your@email.com',
              label: 'Email',
              svg: null,
            },
          ].map(({ href, label, svg }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? '_self' : '_blank'}
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 20px',
                borderRadius: 10,
                border: '1px solid var(--border)',
                background: 'var(--bg-card)',
                color: 'var(--accent)',
                fontSize: '0.875rem',
                fontWeight: 500,
                transition: 'all 0.2s ease',
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'var(--accent)'
                el.style.transform = 'translateY(-3px)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'var(--border)'
                el.style.transform = 'translateY(0)'
              }}
            >
              {svg ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d={svg} />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              )}
              {label}
            </a>
          ))}
        </div>

        <div
          style={{
            marginTop: 64,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            opacity: 0.3,
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            color: 'var(--text)',
          }}
        >
          <span>SCROLL</span>
          <div style={{ width: 1, height: 36, background: 'var(--text)' }} />
        </div>
      </div>
    </section>
  )
}
