'use client'

import { useAccent } from '@/components/AccentProvider'

const TECH_STACK = [
  { name: 'JavaScript', icon: 'devicon-javascript-plain', color: '#f7df1e' },
  { name: 'TypeScript', icon: 'devicon-typescript-plain', color: '#3178c6' },
  { name: 'Python', icon: 'devicon-python-plain', color: '#3572A5' },
  { name: 'C++', icon: 'devicon-cplusplus-plain', color: '#f34b7d' },
  { name: 'Java', icon: 'devicon-java-plain', color: '#b07219' },
  { name: 'C', icon: 'devicon-c-plain', color: '#555555' },
  { name: 'HTML5', icon: 'devicon-html5-plain', color: '#e34c26' },
  { name: 'CSS3', icon: 'devicon-css3-plain', color: '#264de4' },
  { name: 'Node.js', icon: 'devicon-nodejs-plain', color: '#3c873a' },
  { name: 'Docker', icon: 'devicon-docker-plain', color: '#0db7ed' },
  { name: 'Git', icon: 'devicon-git-plain', color: '#f34f29' },
  { name: 'GitHub', icon: 'devicon-github-original', color: 'var(--text)' },
  { name: 'Nginx', icon: 'devicon-nginx-original', color: '#009900' },
  { name: 'VS Code', icon: 'devicon-vscode-plain', color: '#007ACC' },
]

export default function AboutPage() {
  const { accent } = useAccent()

  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.12.0/devicon.min.css" />

      <section style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px 40px' }}>
        <div className="card" style={{ maxWidth: 760, width: '100%', animation: 'fadeUp 0.6s ease forwards' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <span style={{ fontSize: '1.8rem' }}>👋</span>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text)' }}>About Me</h1>
          </div>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: 16 }}>
            Hi, I&apos;m <strong style={{ color: accent }}>Marios</strong> (also known as m4r1os) — a Discord Bot
            Developer who has been building bots since <strong style={{ color: 'var(--text)' }}>2020</strong>.
          </p>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: 16 }}>
            I primarily code in <strong style={{ color: 'var(--text)' }}>JavaScript</strong>,{' '}
            <strong style={{ color: 'var(--text)' }}>Python</strong>,{' '}
            <strong style={{ color: 'var(--text)' }}>HTML</strong> and{' '}
            <strong style={{ color: 'var(--text)' }}>CSS</strong>, with experience in C, C++, and Java.
            I love the Discord ecosystem and have built everything from roleplay bots to complex staff management systems.
          </p>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '1.05rem' }}>
            Passionate about clean code, open source, and helping other developers in the community.
          </p>
          <div style={{ display: 'flex', gap: 10, marginTop: 24, flexWrap: 'wrap' }}>
            {['Discord Bots', 'Web Dev', 'Open Source', 'JavaScript', 'Python'].map(tag => (
              <span key={tag} style={{
                padding: '4px 12px', borderRadius: 100, fontSize: '0.78rem',
                fontFamily: 'var(--font-jetbrains)',
                background: 'color-mix(in srgb, var(--accent) 10%, transparent)',
                border: '1px solid color-mix(in srgb, var(--accent) 25%, transparent)',
                color: 'var(--accent)',
              }}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 8, color: 'var(--text)' }}>Languages & Technologies</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 36 }}>Tools I use on a regular basis</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: 14 }}>
            {TECH_STACK.map(({ name, icon, color }, i) => (
              <div key={name} className="card" style={{
                padding: '18px 12px', textAlign: 'center',
                animationDelay: `${i * 40}ms`,
                animation: 'fadeUp 0.5s ease forwards',
                opacity: 0,
              }}>
                <i className={icon} style={{ fontSize: '2.2rem', color, display: 'block', marginBottom: 8 }} />
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 500 }}>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
