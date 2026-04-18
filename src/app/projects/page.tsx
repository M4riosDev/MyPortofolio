'use client'

import { useAccent } from '@/components/AccentProvider'

const PROJECTS = [
  {
    year: '2025',
    title: 'Ultimate Discord Roleplay Bot',
    description: 'A feature-rich roleplay bot with tools, logging, ticket systems, staff management, and giveaways. The most complete roleplay solution for Discord servers.',
    tags: ['JavaScript', 'discord.js', 'Node.js'],
    github: 'https://github.com/M4riosDev/Discord-Roleplay-Bot',
    featured: true,
  },
  {
    year: '2022',
    title: 'Roleplay Chats Bot',
    description: 'Transforms Discord messages to look like various social platform styles, bringing a unique aesthetic to roleplay experiences.',
    tags: ['JavaScript', 'discord.jsV12'],
    github: 'https://github.com/M4riosDev/Roleplay-Chats/',
    featured: false,
  },
  {
    year: '2022',
    title: 'Activity System',
    description: 'A staff activity tracking system with on/off shift logging, designed to keep Discord communities organised and accountable.',
    tags: ['JavaScript', 'discord.jsV12'],
    github: 'https://github.com/M4riosDev/Activity-SystemV12',
    featured: false,
  },
]

export default function ProjectsPage() {
  const { accent } = useAccent()

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '80px 24px' }}>
      <div style={{ marginBottom: 48, textAlign: 'center' }}>
        <span style={{ display: 'inline-block', fontFamily: 'var(--font-jetbrains)', fontSize: '0.8rem', color: accent, letterSpacing: '0.1em', marginBottom: 12 }}>
          // projects
        </span>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--text)', letterSpacing: '-1px' }}>
          Things I&apos;ve Built
        </h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {PROJECTS.map((p, i) => (
          <div key={p.title} className="card" style={{ animationDelay: `${i * 100}ms`, animation: 'fadeUp 0.6s ease forwards', opacity: 0, position: 'relative' }}>
            {p.featured && (
              <div style={{
                position: 'absolute', top: 20, right: 20,
                padding: '2px 10px', borderRadius: 100, fontSize: '0.7rem',
                fontFamily: 'var(--font-jetbrains)',
                background: `color-mix(in srgb, ${accent} 15%, transparent)`,
                border: `1px solid color-mix(in srgb, ${accent} 30%, transparent)`,
                color: accent,
              }}>featured</div>
            )}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              <div style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '0.75rem', color: accent, fontWeight: 600, minWidth: 36, paddingTop: 4 }}>
                {p.year}
              </div>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text)', marginBottom: 8, paddingRight: p.featured ? 80 : 0 }}>
                  {p.title}
                </h2>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.9rem', marginBottom: 16 }}>
                  {p.description}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {p.tags.map(tag => (
                      <span key={tag} style={{ padding: '2px 10px', borderRadius: 6, fontSize: '0.75rem', fontFamily: 'var(--font-jetbrains)', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a href={p.github} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 14px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 500, transition: 'all 0.2s ease', textDecoration: 'none' }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = accent; el.style.borderColor = accent }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'var(--text-muted)'; el.style.borderColor = 'var(--border)' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
                    </svg>
                    View on GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
