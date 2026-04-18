'use client'

import { useAccent } from '@/components/AccentProvider'

const EXPERIENCE = [
  { period: '2020', title: 'Discord Bot Development', subtitle: 'Self-taught', description: 'Started building Discord bots with discord.js. Learned JavaScript from the ground up while creating community tools.', tags: ['discord.js', 'JavaScript', 'Node.js'], icon: '🤖' },
  { period: '2021', title: 'Web Development', subtitle: 'Frontend & Backend', description: 'Expanded into web development, learning HTML, CSS, JavaScript, and PHP. Started building personal projects and portfolios.', tags: ['HTML', 'CSS', 'JavaScript', 'PHP'], icon: '🌐' },
  { period: '2022', title: 'Advanced Discord Bot Dev', subtitle: 'Ongoing', description: 'Moved to slash commands, advanced permission systems, and modular bot architecture. Built complex bots for large servers.', tags: ['discord.jsV14', 'Slash Commands', 'Databases'], icon: '⚡' },
  { period: '2023', title: 'Minecraft Mod Development', subtitle: 'Side project', description: 'Explored Java and Minecraft modding with MCreator and raw Java mods. Gained deeper object-oriented programming experience.', tags: ['Java', 'MCreator', 'OOP'], icon: '🎮' },
  { period: '2025', title: 'Full-Stack Projects', subtitle: 'Present', description: 'Building more complex applications combining Discord bots with web dashboards. Working with TypeScript, Next.js, and databases.', tags: ['TypeScript', 'Next.js', 'PostgreSQL'], icon: '🚀' },
]

export default function ExperiencePage() {
  const { accent } = useAccent()

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '80px 24px' }}>
      <div style={{ marginBottom: 52, textAlign: 'center' }}>
        <span style={{ display: 'inline-block', fontFamily: 'var(--font-jetbrains)', fontSize: '0.8rem', color: accent, letterSpacing: '0.1em', marginBottom: 12 }}>
          // experience
        </span>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--text)', letterSpacing: '-1px' }}>My Journey</h1>
      </div>

      <div style={{ position: 'relative' }}>
        {/* Center line */}
        <div style={{ position: 'absolute', left: 'calc(50% - 0.5px)', top: 0, bottom: 0, width: 1, background: 'var(--border)' }} />

        {EXPERIENCE.map((item, i) => {
          const isLeft = i % 2 === 0
          return (
            <div key={item.title} style={{
              display: 'flex',
              justifyContent: isLeft ? 'flex-start' : 'flex-end',
              marginBottom: 40,
              position: 'relative',
              animationDelay: `${i * 120}ms`,
              animation: 'fadeUp 0.6s ease forwards',
              opacity: 0,
            }}>
              {/* Dot */}
              <div style={{
                position: 'absolute', left: 'calc(50% - 6px)', top: 20,
                width: 12, height: 12, borderRadius: '50%',
                background: accent, border: '2px solid var(--bg)', zIndex: 2,
                boxShadow: `0 0 10px ${accent}88`,
              }} />
              {/* Card */}
              <div className="card" style={{ width: 'calc(50% - 28px)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                  <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '0.72rem', color: accent, fontWeight: 600, letterSpacing: '0.1em' }}>
                    {item.period}
                  </span>
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>{item.title}</h3>
                <p style={{ fontSize: '0.78rem', color: accent, marginBottom: 8, fontWeight: 500 }}>{item.subtitle}</p>
                <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 12 }}>{item.description}</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {item.tags.map(tag => (
                    <span key={tag} style={{ padding: '2px 8px', borderRadius: 5, fontSize: '0.7rem', fontFamily: 'var(--font-jetbrains)', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <style jsx>{`
        @media (max-width: 600px) {
          div[style*="calc(50% - 28px)"] { width: calc(100% - 36px) !important; }
          div[style*="justifyContent"] { justify-content: flex-end !important; }
          div[style*="calc(50% - 0.5px)"] { left: 6px !important; }
          div[style*="calc(50% - 6px)"] { left: 0px !important; }
        }
      `}</style>
    </div>
  )
}
