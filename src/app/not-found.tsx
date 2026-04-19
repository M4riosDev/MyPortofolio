'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useAccent } from '@/components/AccentProvider'

const JOKES = [
  "git blame — yeah, this one's on you.",
  'HTTP 404: Page is AFK.',
  'Error: Cannot read properties of undefined (reading \'page\')',
]

export default function NotFound() {
  const { accent } = useAccent()
  const [jokeIndex, setJokeIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [isDone, setIsDone] = useState(false)
  const [isBursting, setIsBursting] = useState(false)
  const [isNearGlitch, setIsNearGlitch] = useState(false)
  const [hoverPower, setHoverPower] = useState(0)
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const burstLoopTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const burstTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const mouseRafRef = useRef<number | null>(null)
  const glitchWrapRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const joke = JOKES[jokeIndex]
    let i = 0
    setDisplayText('')
    setIsTyping(true)
    setIsDone(false)

    const type = () => {
      if (i <= joke.length) {
        setDisplayText(joke.slice(0, i))
        i++
        typingTimeoutRef.current = setTimeout(type, 36)
      } else {
        setIsTyping(false)
        setIsDone(true)
        typingTimeoutRef.current = setTimeout(() => {
          setJokeIndex(prev => (prev + 1) % JOKES.length)
        }, 3600)
      }
    }
    typingTimeoutRef.current = setTimeout(type, 600)
    return () => { if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current) }
  }, [jokeIndex])

  useEffect(() => {
    const triggerBurst = () => {
      const nextIn = 1800 + Math.random() * 2200
      burstLoopTimeoutRef.current = setTimeout(() => {
        setIsBursting(true)
        burstTimeoutRef.current = setTimeout(() => {
          setIsBursting(false)
          triggerBurst()
        }, 180 + Math.random() * 170)
      }, nextIn)
    }

    triggerBurst()

    return () => {
      if (burstTimeoutRef.current) clearTimeout(burstTimeoutRef.current)
      if (burstLoopTimeoutRef.current) clearTimeout(burstLoopTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      if (!glitchWrapRef.current) return
      if (mouseRafRef.current) cancelAnimationFrame(mouseRafRef.current)

      mouseRafRef.current = requestAnimationFrame(() => {
        if (!glitchWrapRef.current) return
        const rect = glitchWrapRef.current.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = event.clientX - cx
        const dy = event.clientY - cy
        const distance = Math.hypot(dx, dy)
        const triggerRadius = Math.max(240, rect.width * 0.9)
        const nextPower = Math.max(0, Math.min(1, 1 - distance / triggerRadius))

        setHoverPower(nextPower)
        setIsNearGlitch(nextPower > 0.14)
      })
    }

    const onLeave = () => {
      setHoverPower(0)
      setIsNearGlitch(false)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseout', onLeave)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout', onLeave)
      if (mouseRafRef.current) cancelAnimationFrame(mouseRafRef.current)
    }
  }, [])

  const turboMode = isBursting || isNearGlitch
  const glitchVars = {
    '--scan-speed': `${Math.max(0.28, 2.6 - hoverPower * 2.15)}s`,
    '--noise-speed': `${Math.max(0.08, 0.22 - hoverPower * 0.12)}s`,
    '--glitch-cycle': `${Math.max(0.32, 4 - hoverPower * 3.2)}s`,
    '--glitch-offset': `${4 + hoverPower * 10}px`,
  } as CSSProperties

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes glitch1 {
          0%, 89%, 100% { clip-path: inset(0 0 100% 0); transform: translate(0, 0); }
          90%  { clip-path: inset(20% 0 55% 0); transform: translate(-4px, 0); }
          92%  { clip-path: inset(60% 0 15% 0); transform: translate(4px, 0); }
          94%  { clip-path: inset(5%  0 80% 0); transform: translate(-3px, 0); }
          96%  { clip-path: inset(75% 0 8%  0); transform: translate(3px, 0); }
          98%  { clip-path: inset(40% 0 40% 0); transform: translate(-4px, 0); }
        }
        @keyframes glitch2 {
          0%, 89%, 100% { clip-path: inset(0 0 100% 0); transform: translate(0, 0); }
          91%  { clip-path: inset(50% 0 25% 0); transform: translate(4px, 0); }
          93%  { clip-path: inset(10% 0 65% 0); transform: translate(-4px, 0); }
          95%  { clip-path: inset(80% 0 5%  0); transform: translate(3px, 0); }
          97%  { clip-path: inset(30% 0 50% 0); transform: translate(-3px, 0); }
          99%  { clip-path: inset(65% 0 20% 0); transform: translate(4px, 0); }
        }
        @keyframes scanline {
          0%   { top: -4%; }
          100% { top: 108%; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes staticNoise {
          0%, 100% { transform: translate(0, 0); opacity: 0.22; }
          20% { transform: translate(-1%, 1%); opacity: 0.32; }
          40% { transform: translate(1.5%, -1%); opacity: 0.24; }
          60% { transform: translate(-1.2%, 0.6%); opacity: 0.3; }
          80% { transform: translate(0.6%, -1.2%); opacity: 0.2; }
        }
        @keyframes burstShake {
          0% { transform: translate(0, 0) skewX(0deg); }
          20% { transform: translate(-2px, 1px) skewX(-2deg); }
          40% { transform: translate(3px, -1px) skewX(2deg); }
          60% { transform: translate(-3px, 1px) skewX(-1deg); }
          80% { transform: translate(2px, -1px) skewX(1deg); }
          100% { transform: translate(0, 0) skewX(0deg); }
        }

        .nf-1 { animation: fadeUp 0.5s ease 0.05s forwards; opacity: 0; }
        .nf-2 { animation: fadeUp 0.5s ease 0.2s  forwards; opacity: 0; }
        .nf-3 { animation: fadeUp 0.5s ease 0.35s forwards; opacity: 0; }
        .nf-4 { animation: fadeUp 0.5s ease 0.5s  forwards; opacity: 0; }
        .nf-5 { animation: fadeUp 0.5s ease 0.65s forwards; opacity: 0; }

        .glitch-wrap {
          position: relative;
          display: inline-block;
          animation: float 5s ease-in-out infinite;
        }
        .glitch-base {
          font-family: var(--font-jetbrains);
          font-size: clamp(7rem, 24vw, 13rem);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -6px;
          color: var(--accent);
          position: relative;
          z-index: 1;
          user-select: none;
        }
        .glitch-layer {
          position: absolute;
          inset: 0;
          font-family: var(--font-jetbrains);
          font-size: clamp(7rem, 24vw, 13rem);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -6px;
          pointer-events: none;
          user-select: none;
        }
        .gl-red  { color: #ff4060; animation: glitch1 var(--glitch-cycle, 4s) infinite steps(1); left: var(--glitch-offset, 4px); }
        .gl-cyan { color: #00f5e4; animation: glitch2 var(--glitch-cycle, 4s) infinite steps(1); left: calc(var(--glitch-offset, 4px) * -1); animation-delay: 0.08s; }

        .scan-wrap { position: relative; overflow: hidden; }
        .scanline {
          position: absolute; left: 0; right: 0; height: 2px;
          background: linear-gradient(to right, transparent, color-mix(in srgb, var(--accent) 35%, transparent), transparent);
          animation: scanline var(--scan-speed, 2.6s) linear infinite;
          pointer-events: none; z-index: 3;
        }
        .scan-wrap::after {
          content: '';
          position: absolute;
          inset: -12%;
          background-image:
            repeating-linear-gradient(
              0deg,
              rgba(255,255,255,0.02) 0,
              rgba(255,255,255,0.02) 1px,
              transparent 1px,
              transparent 3px
            ),
            linear-gradient(90deg, rgba(255, 64, 96, 0.05), rgba(0, 245, 228, 0.05));
          mix-blend-mode: screen;
          pointer-events: none;
          animation: staticNoise var(--noise-speed, 0.22s) steps(2) infinite;
          z-index: 2;
        }

        .bursting .glitch-wrap {
          animation: float 5s ease-in-out infinite, burstShake 0.16s steps(2) infinite;
          filter: saturate(1.25) contrast(1.15);
        }
        .bursting .gl-red {
          left: 7px;
          text-shadow: 0 0 20px rgba(255, 64, 96, 0.5);
        }
        .bursting .gl-cyan {
          left: -7px;
          text-shadow: 0 0 20px rgba(0, 245, 228, 0.5);
        }
        .bursting .scanline {
          animation-duration: 0.6s;
          opacity: 0.95;
        }
        .mouse-near .glitch-wrap {
          animation: float 2.6s ease-in-out infinite, burstShake 0.08s steps(2) infinite;
          filter: saturate(1.45) contrast(1.22);
        }
        .mouse-near .gl-red {
          text-shadow: 0 0 28px rgba(255, 64, 96, 0.72);
        }
        .mouse-near .gl-cyan {
          text-shadow: 0 0 28px rgba(0, 245, 228, 0.72);
        }
        .mouse-near .scanline {
          animation-duration: 0.28s;
          opacity: 1;
        }

        .terminal {
          background: #0d0d0d;
          border: 1px solid color-mix(in srgb, var(--accent) 22%, var(--border));
          border-radius: 14px;
          overflow: hidden;
          max-width: 460px;
          width: 100%;
          box-shadow: 0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.03);
        }
        .terminal-bar {
          background: #1a1a1a;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 10px 14px;
          display: flex;
          align-items: center;
          gap: 7px;
        }
        .t-dot { width: 11px; height: 11px; border-radius: 50%; flex-shrink: 0; }
        .terminal-body {
          padding: 16px 18px 18px;
          font-family: var(--font-jetbrains);
          font-size: 0.83rem;
          line-height: 1.7;
          text-align: left;
          min-height: 72px;
        }
        .t-prompt { color: var(--accent); margin-right: 8px; }
        .t-cmd    { color: rgba(255,255,255,0.85); }
        .t-cursor {
          display: inline-block;
          width: 8px; height: 1.1em;
          background: var(--accent);
          margin-left: 1px;
          vertical-align: text-bottom;
          animation: blink 0.85s step-end infinite;
        }
        .t-done {
          color: color-mix(in srgb, var(--accent) 55%, rgba(255,255,255,0.4));
          font-size: 0.74rem;
          margin-top: 4px;
          animation: fadeIn 0.4s ease forwards;
        }

        .err-badge {
          display: inline-flex; align-items: center; gap: 7px;
          background: color-mix(in srgb, #ff4060 9%, transparent);
          border: 1px solid color-mix(in srgb, #ff4060 28%, transparent);
          border-radius: 100px;
          padding: 4px 14px;
          font-family: var(--font-jetbrains);
          font-size: 0.7rem;
          color: #ff6070;
          letter-spacing: 0.08em;
        }
        .err-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #ff4060;
          box-shadow: 0 0 6px #ff4060;
          flex-shrink: 0;
        }

        .back-btn {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 12px 28px;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: var(--bg-card);
          color: var(--text);
          font-weight: 600;
          font-size: 0.88rem;
          text-decoration: none;
          transition: all 0.22s ease;
          position: relative;
          overflow: hidden;
        }
        .back-btn:hover {
          border-color: var(--accent);
          color: var(--accent);
          transform: translateY(-3px);
          box-shadow: 0 8px 28px color-mix(in srgb, var(--accent) 20%, transparent);
          opacity: 1;
        }
      `}</style>

      <div style={{
        minHeight: 'calc(100vh - 56px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0 24px',
      }}>

        <div className="nf-1" style={{ marginBottom: 32 }}>
          <span className="err-badge">
            <span className="err-dot" />
            UNHANDLED EXCEPTION
          </span>
        </div>

        <div
          ref={glitchWrapRef}
          className={`nf-2 scan-wrap ${turboMode ? 'bursting' : ''} ${isNearGlitch ? 'mouse-near' : ''}`}
          style={{ marginBottom: 16, ...glitchVars }}
        >
          <div className="scanline" />
          <div className="glitch-wrap">
            <div className="glitch-base">404</div>
            <div className="glitch-layer gl-red">404</div>
            <div className="glitch-layer gl-cyan">404</div>
          </div>
        </div>

        <div className="nf-3" style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>
            Page not found
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: 320, margin: '0 auto', lineHeight: 1.65, fontSize: '0.9rem' }}>
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className="nf-4" style={{ marginBottom: 36, display: 'flex', justifyContent: 'center', width: '100%' }}>
          <div className="terminal">
            <div className="terminal-bar">
              <span className="t-dot" style={{ background: '#ff5f57' }} />
              <span className="t-dot" style={{ background: '#febc2e' }} />
              <span className="t-dot" style={{ background: '#28c840' }} />
              <span style={{
                marginLeft: 10,
                fontSize: '0.7rem',
                fontFamily: 'var(--font-jetbrains)',
                color: 'rgba(255,255,255,0.3)',
              }}>
                bash — not-found
              </span>
            </div>
            <div className="terminal-body">
              <div>
                <span className="t-prompt">~$</span>
                <span className="t-cmd">{displayText}</span>
                {isTyping && <span className="t-cursor" />}
              </div>
              {isDone && (
                <div className="t-done">
                  — press any key to continue (just kidding)
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="nf-5">
          <Link href="/" className="back-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            Back Home
          </Link>
        </div>

      </div>
    </>
  )
}