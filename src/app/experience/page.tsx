'use client'

import { useAccent } from '@/components/AccentProvider'
import { useEffect, useRef } from 'react'

const WORK = [
  {
    role: 'Full-Stack Developer',
    company: 'Freelance / Self-employed',
    date: '2023 — Present',
    type: 'open',
    typeLabel: 'OPEN TO WORK',
    desc: 'Building end-to-end web platforms and Discord automation systems for clients across Europe. Delivering custom dashboards, role-play management tools, and business automation workflows.',
    tags: ['Next.js', 'Node.js', 'Discord.js', 'MongoDB', 'Docker'],
  },
  {
    role: 'Discord Bot Developer',
    company: 'Various Communities',
    date: '2021 — 2023',
    type: 'parttime',
    typeLabel: 'PART-TIME',
    desc: 'Developed 10+ production Discord bots across communities with thousands of members. Focused on moderation, economy systems, and automation features with real-time dashboards.',
    tags: ['TypeScript', 'Discord.js', 'PostgreSQL', 'Express'],
  },
]

const EDUCATION = [
  {
    role: 'IT & Computing',
    company: 'Harrow College, UK',
    date: '2024 — Present',
    type: 'fulltime',
    typeLabel: 'FULL-TIME',
    desc: 'Studying IT and Computing in the UK while continuing to build real-world projects. Applying academic theory directly to production systems and open source work.',
    tags: ['Computer Science', 'Networking', 'Systems Design'],
  },
  {
    role: 'Programming & Web Development',
    company: 'Independent Study',
    date: '2021 — 2024',
    type: 'selftaught',
    typeLabel: 'SELF-TAUGHT',
    desc: '4+ years of self-directed learning — from JavaScript fundamentals to full production deployments. Built real systems for real communities, learning from direct feedback loops.',
    tags: ['JavaScript', 'React', 'Nginx', 'Cloudflare', 'Git'],
  },
]

const TYPE_STYLES: Record<string, { bg: string; border: string; color: string }> = {
  open:      { bg: 'rgba(74,222,128,0.1)',  border: 'rgba(74,222,128,0.25)',  color: '#4ade80' },
  fulltime:  { bg: 'rgba(59,130,246,0.1)',  border: 'rgba(59,130,246,0.25)',  color: '#60a5fa' },
  parttime:  { bg: 'rgba(168,85,247,0.1)',  border: 'rgba(168,85,247,0.25)',  color: '#c084fc' },
  selftaught:{ bg: 'rgba(251,191,36,0.1)',  border: 'rgba(251,191,36,0.25)',  color: '#fbbf24' },
}

function Entry({ role, company, date, type, typeLabel, desc, tags, accent, delay }: {
  role: string; company: string; date: string; type: string; typeLabel: string;
  desc: string; tags: string[]; accent: string; delay: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const ts = TYPE_STYLES[type]

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
        }, delay)
        obs.disconnect()
      }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        marginBottom: 28,
        opacity: 0,
        transform: 'translateY(20px)',
        transition: 'opacity 0.45s ease, transform 0.45s ease',
      }}
    >
      {/* Timeline dot */}
      <div style={{
        position: 'absolute',
        left: -32,
        top: 20,
        width: 10,
        height: 10,
        borderRadius: '50%',
        background: accent,
        boxShadow: `0 0 0 3px color-mix(in srgb, ${accent} 20%, transparent)`,
        zIndex: 1,
      }} />

      {/* Card */}
      <style>{`
        .exp-card-${delay}:hover {
          border-color: color-mix(in srgb, var(--accent) 35%, transparent) !important;
          transform: translateX(4px);
          box-shadow: -4px 0 24px color-mix(in srgb, var(--accent) 6%, transparent);
        }
      `}</style>
      <div
        className={`exp-card-${delay}`}
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          padding: '22px 24px',
          transition: 'border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease',
        }}
      >
        {/* Type badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          fontFamily: 'var(--font-jetbrains)',
          fontSize: '0.65rem',
          letterSpacing: '0.06em',
          padding: '2px 9px',
          borderRadius: 100,
          marginBottom: 10,
          background: ts.bg,
          border: `1px solid ${ts.border}`,
          color: ts.color,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: ts.color, flexShrink: 0 }} />
          {typeLabel}
        </div>

        {/* Top row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 10, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1.2 }}>{role}</div>
            <div style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '0.85rem', color: accent, marginTop: 3 }}>{company}</div>
          </div>
          <span style={{
            fontFamily: 'var(--font-jetbrains)',
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.06em',
            whiteSpace: 'nowrap',
            padding: '4px 10px',
            background: `color-mix(in srgb, ${accent} 6%, transparent)`,
            border: `1px solid color-mix(in srgb, ${accent} 18%, transparent)`,
            borderRadius: 100,
            flexShrink: 0,
          }}>
            {date}
          </span>
        </div>

        {/* Description */}
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 14 }}>{desc}</p>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
          {tags.map(tag => (
            <span key={tag} style={{
              fontFamily: 'var(--font-jetbrains)',
              fontSize: '0.67rem',
              padding: '3px 10px',
              borderRadius: 100,
              background: `color-mix(in srgb, ${accent} 8%, transparent)`,
              border: `1px solid color-mix(in srgb, ${accent} 20%, transparent)`,
              color: accent,
              letterSpacing: '0.04em',
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function SectionHead({ label, delay }: { label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)' }, delay)
        obs.disconnect()
      }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])

  return (
    <div ref={ref} style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      margin: '52px 0 28px',
      opacity: 0,
      transform: 'translateY(16px)',
      transition: 'opacity 0.45s ease, transform 0.45s ease',
    }}>
      <span style={{
        fontFamily: 'var(--font-jetbrains)',
        fontSize: '0.7rem',
        letterSpacing: '0.14em',
        color: 'var(--accent)',
        background: 'color-mix(in srgb, var(--accent) 8%, transparent)',
        border: '1px solid color-mix(in srgb, var(--accent) 22%, transparent)',
        borderRadius: 100,
        padding: '3px 12px',
      }}>
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, color-mix(in srgb, var(--accent) 20%, transparent), transparent)' }} />
    </div>
  )
}

export default function ExperiencePage() {
  const { accent } = useAccent()

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .exp-timeline {
          position: relative;
          padding-left: 36px;
        }
        .exp-timeline::before {
          content: '';
          position: absolute;
          left: 8px;
          top: 0;
          bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom, var(--accent), color-mix(in srgb, var(--accent) 5%, transparent));
        }
      `}</style>

      <section style={{ minHeight: 'calc(100vh - 56px)', padding: '80px 24px 100px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>

          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            marginBottom: 48,
            animation: 'fadeUp 0.5s ease 0.05s forwards',
            opacity: 0,
          }}>
            <div>
              <span style={{
                fontFamily: 'var(--font-jetbrains)',
                fontSize: '0.7rem',
                color: accent,
                letterSpacing: '0.12em',
                opacity: 0.75,
                display: 'block',
                marginBottom: 4,
              }}>
                $ cat experience.json
              </span>
              <h1 style={{ fontSize: '1.85rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1.1 }}>
                Work Experience
              </h1>
            </div>
          </div>

          {/* Work */}
          <SectionHead label="WORK HISTORY" delay={80} />
          <div className="exp-timeline">
            {WORK.map((e, i) => (
              <Entry key={e.role} {...e} accent={accent} delay={150 + i * 100} />
            ))}
          </div>

          {/* Education */}
          <SectionHead label="EDUCATION" delay={180} />
          <div className="exp-timeline">
            {EDUCATION.map((e, i) => (
              <Entry key={e.role} {...e} accent={accent} delay={300 + i * 100} />
            ))}
          </div>

        </div>
      </section>
    </>
  )
}
