'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useAccent } from '@/components/AccentProvider'
const mariosLogo = '/m4r1s.png'

const SOCIAL_LINKS = [
  {
    href: 'https://discord.com/users/930463180189204561',
    label: 'Discord',
    svg: 'M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.102 18.08.114 18.1.132 18.11a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z',
  },
  {
    href: 'https://github.com/M4riosDev',
    label: 'GitHub',
    svg: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z',
    filled: true,
  },
  {
    href: 'contact',
    label: 'Email',
    svg: null,
  },
]

const STATS = [
  { label: 'Years coding', value: '4+' },
  { label: 'Projects shipped', value: '20+' },
  { label: 'Discord bots', value: '10+' },
]

export default function HomePage() {
  const typedRef = useRef<HTMLSpanElement>(null)
  const typedInstanceRef = useRef<any>(null)
  const { accent, nextAccent } = useAccent()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    let cancelled = false
    const init = async () => {
      const { default: Typed } = await import('typed.js')
      if (cancelled || !typedRef.current) return
      typedInstanceRef.current = new Typed(typedRef.current, {
        strings: ['Discord Bot Developer', 'Web Developer', 'JavaScript Engineer', 'Open Source Contributor'],
        loop: true,
        typeSpeed: 70,
        backSpeed: 40,
        backDelay: 1800,
      })
    }
    init()
    return () => {
      cancelled = true
      typedInstanceRef.current?.destroy()
      typedInstanceRef.current = null
    }
  }, [])

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .home-fade-1 { animation: fadeUp 0.6s ease 0.05s forwards; opacity: 0; }
        .home-fade-2 { animation: fadeUp 0.6s ease 0.15s forwards; opacity: 0; }
        .home-fade-3 { animation: fadeUp 0.6s ease 0.25s forwards; opacity: 0; }
        .home-fade-4 { animation: fadeUp 0.6s ease 0.35s forwards; opacity: 0; }
        .home-fade-5 { animation: fadeUp 0.6s ease 0.45s forwards; opacity: 0; }
        .home-fade-6 { animation: fadeUp 0.6s ease 0.55s forwards; opacity: 0; }

        .avatar-float { animation: float 4s ease-in-out infinite; }

        .stat-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 18px 22px;
          transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
          cursor: default;
          flex: 1;
          min-width: 90px;
          text-align: center;
        }
        .stat-card:hover {
          border-color: var(--accent);
          transform: translateY(-4px);
          box-shadow: 0 8px 28px color-mix(in srgb, var(--accent) 15%, transparent);
        }

        .social-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 11px 22px;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: var(--bg-card);
          color: var(--text);
          font-size: 0.875rem;
          font-weight: 500;
          transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease, color 0.2s ease;
          text-decoration: none;
          white-space: nowrap;
        }
        .social-btn:hover {
          border-color: var(--accent);
          color: var(--accent);
          transform: translateY(-3px);
          box-shadow: 0 6px 20px color-mix(in srgb, var(--accent) 18%, transparent);
          opacity: 1;
        }

        .name-shimmer {
          background: linear-gradient(
            90deg,
            var(--accent) 0%,
            color-mix(in srgb, var(--accent) 60%, white) 40%,
            var(--accent) 60%,
            color-mix(in srgb, var(--accent) 60%, white) 80%,
            var(--accent) 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
          cursor: pointer;
        }

        .scroll-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          opacity: 0.28;
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          color: var(--text);
          margin-top: 72px;
          animation: fadeUp 0.6s ease 0.9s forwards;
          opacity: 0;
        }
        .scroll-line {
          width: 1px;
          height: 38px;
          background: linear-gradient(to bottom, var(--text), transparent);
        }

        .availability-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #4ade80;
          position: relative;
          flex-shrink: 0;
        }
        .availability-ring {
          position: absolute;
          inset: -2px;
          border-radius: 50%;
          background: #4ade80;
          animation: pulse-ring 1.6s ease-out infinite;
          pointer-events: none;
        }
      `}</style>

      <section
        style={{
          minHeight: 'calc(100vh - 56px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 24px',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: 740, width: '100%' }}>

          {/* Avatar */}
          <div className="home-fade-1" style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
            <div className="avatar-float" style={{ position: 'relative', display: 'inline-block' }}>
              {/* Glow ring */}
              <div style={{
                position: 'absolute',
                inset: -8,
                borderRadius: 24,
                background: `radial-gradient(ellipse, color-mix(in srgb, var(--accent) 25%, transparent), transparent 70%)`,
                zIndex: 0,
              }} />
              <Image
                src={mariosLogo}
                alt="Marios logo"
                width={88}
                height={88}
                priority
                style={{
                  position: 'relative',
                  zIndex: 1,
                  width: 88,
                  height: 88,
                  borderRadius: 20,
                  objectFit: 'cover',
                  border: '1.5px solid color-mix(in srgb, var(--accent) 45%, var(--border))',
                  boxShadow: '0 12px 40px color-mix(in srgb, var(--accent) 22%, transparent), 0 2px 8px rgba(0,0,0,0.4)',
                }}
              />
            </div>
          </div>

          {/* Availability badge */}
          <div className="home-fade-2" style={{ display: 'flex', justifyContent: 'center', marginBottom: 22 }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'color-mix(in srgb, #4ade80 8%, transparent)',
              border: '1px solid color-mix(in srgb, #4ade80 30%, transparent)',
              borderRadius: 100,
              padding: '5px 14px 5px 10px',
              fontSize: '0.75rem',
              color: '#4ade80',
              fontFamily: 'var(--font-jetbrains)',
              letterSpacing: '0.04em',
            }}>
              <span className="availability-dot">
                <span className="availability-ring" />
              </span>
              Available for work
            </div>
          </div>

          {/* Whoami pill */}
          <div className="home-fade-2" style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <div style={{
              display: 'inline-block',
              background: 'color-mix(in srgb, var(--accent) 10%, transparent)',
              border: '1px solid color-mix(in srgb, var(--accent) 28%, transparent)',
              borderRadius: 100,
              padding: '4px 16px',
              fontSize: '0.78rem',
              fontFamily: 'var(--font-jetbrains)',
              color: 'var(--accent)',
              letterSpacing: '0.06em',
            }}>
              $ whoami
            </div>
          </div>

          {/* Name */}
          <h1
            className="home-fade-3"
            onClick={nextAccent}
            title="Click to change color theme"
            style={{
              fontSize: 'clamp(2.8rem, 8vw, 5.2rem)',
              fontWeight: 700,
              letterSpacing: '-2.5px',
              lineHeight: 1.08,
              marginBottom: 16,
            }}
          >
            {'Hi, I am '}
            <span className="name-shimmer">Marios</span>
            {'.'}
          </h1>

          {/* Location */}
          <p className="home-fade-4" style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.55rem)',
            color: 'var(--text-muted)',
            fontWeight: 400,
            marginBottom: 10,
          }}>
            Full-Stack Web Developer from{' '}
            <span style={{ color: 'var(--text)', fontWeight: 500 }}>Greece 🇬🇷</span>
          </p>

          {/* Typed */}
          <p className="home-fade-4" style={{
            fontSize: 'clamp(0.95rem, 2.3vw, 1.2rem)',
            color: 'var(--text-muted)',
            fontWeight: 400,
            marginBottom: 40,
            minHeight: 36,
          }}>
            {"I'm a "}
            <span ref={typedRef} style={{ color: 'var(--accent)', fontWeight: 600 }} />
          </p>

          {/* Stats row */}
          <div className="home-fade-5" style={{
            display: 'flex',
            gap: 12,
            justifyContent: 'center',
            marginBottom: 36,
            flexWrap: 'wrap',
          }}>
            {STATS.map(({ label, value }) => (
              <div key={label} className="stat-card">
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'var(--accent)',
                  fontFamily: 'var(--font-jetbrains)',
                  lineHeight: 1,
                  marginBottom: 4,
                }}>
                  {value}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* Social buttons */}
          <div className="home-fade-6" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            {SOCIAL_LINKS.map(({ href, label, svg, filled }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className="social-btn"
              >
                {svg ? (
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d={svg} />
                  </svg>
                ) : (
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                )}
                {label}
              </a>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="scroll-indicator">
            <span>SCROLL</span>
            <div className="scroll-line" />
          </div>
        </div>
      </section>
    </>
  )
}
