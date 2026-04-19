'use client'

import { useState, useEffect } from 'react'
import { useAccent } from '@/components/AccentProvider'

type Status = 'idle' | 'sending' | 'sent' | 'error'

type FormState = {
  name: string
  email: string
  message: string
  company: string
}

const SOCIAL_LINKS = [
  {
    label: 'Discord',
    href: 'https://discord.com/users/930463180189204561',
    svg: 'M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.102 18.08.114 18.1.132 18.11a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/M4riosDev',
    svg: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z',
  },
  {
    label: 'Email',
    href: 'mailto:marios.korovesi@m4rios.dev',
    svg: 'M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.5-8 5-8-5V6l8 5 8-5v2.5z',
  },
]

const LOG_LINES = [
  { delay: 0,    color: '#6b7280', text: '> compressing your message...' },
  { delay: 750,  color: '#6b7280', text: '> sending via carrier pigeon 🐦' },
  { delay: 1150, color: '#4ade80', text: '✔ pigeon arrived safely' },
  { delay: 1500, color: '#6b7280', text: '> waking up marios...' },
  { delay: 1900, color: '#facc15', text: '⚠ marios is asleep (as usual)' },
  { delay: 2300, color: '#6b7280', text: '> scheduling notification for when he wakes up' },
  { delay: 2700, color: '#4ade80', text: '✔ message delivered! ETA: soon™' },
]

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label style={{
      display: 'block',
      fontSize: '0.72rem',
      fontWeight: 600,
      color: 'var(--text-muted)',
      marginBottom: 7,
      letterSpacing: '0.1em',
      fontFamily: 'var(--font-jetbrains)',
    }}>
      {children}
    </label>
  )
}

function SuccessState({ onReset }: { onReset: () => void }) {
  const { accent } = useAccent()
  const [visibleLines, setVisibleLines] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const timers = LOG_LINES.map((line, i) =>
      setTimeout(() => {
        setVisibleLines(i + 1)
        if (i === LOG_LINES.length - 1) {
          setTimeout(() => setDone(true), 400)
        }
      }, line.delay)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  const progress = Math.round((visibleLines / LOG_LINES.length) * 100)

  return (
    <div style={{ padding: '32px 0 24px' }}>
      {/* Terminal window */}
      <div style={{
        background: '#0d0d0d',
        border: '1px solid color-mix(in srgb, var(--accent) 20%, var(--border))',
        borderRadius: 14,
        overflow: 'hidden',
        marginBottom: 24,
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      }}>
        {/* Title bar */}
        <div style={{
          background: '#1a1a1a',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '9px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 7,
        }}>
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }} />
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#febc2e', display: 'inline-block' }} />
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c840', display: 'inline-block' }} />
          <span style={{ marginLeft: 10, fontSize: '0.7rem', fontFamily: 'var(--font-jetbrains)', color: 'rgba(255,255,255,0.3)' }}>
            bash — send-message.sh
          </span>
        </div>

        {/* Log output */}
        <div style={{ padding: '14px 18px 18px', fontFamily: 'var(--font-jetbrains)', fontSize: '0.8rem', lineHeight: 2 }}>
          {LOG_LINES.slice(0, visibleLines).map((line, i) => (
            <div
              key={i}
              style={{
                color: line.color,
                animation: 'logSlideIn 0.25s ease forwards',
              }}
            >
              {line.text}
            </div>
          ))}
          {!done && visibleLines < LOG_LINES.length && (
            <span style={{
              display: 'inline-block',
              width: 7, height: '1em',
              background: 'var(--accent)',
              verticalAlign: 'text-bottom',
              animation: 'blink 0.8s step-end infinite',
            }} />
          )}
        </div>

        {/* Progress bar */}
        <div style={{ height: 2, background: 'rgba(255,255,255,0.05)' }}>
          <div style={{
            height: '100%',
            background: `linear-gradient(to right, var(--accent), color-mix(in srgb, var(--accent) 60%, white))`,
            width: `${progress}%`,
            transition: 'width 0.35s ease',
            boxShadow: `0 0 8px color-mix(in srgb, var(--accent) 60%, transparent)`,
          }} />
        </div>
      </div>

      {/* Final message - appears when done */}
      {done && (
        <div style={{
          textAlign: 'center',
          animation: 'popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards',
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: 10 }}>🎉</div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>
            Message delivered (probably)
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 20, lineHeight: 1.6 }}>
            I&apos;ll get back to you once I&apos;ve had my coffee ☕
          </p>
          <button
            onClick={onReset}
            style={{
              padding: '9px 22px',
              borderRadius: 9,
              border: '1px solid var(--border)',
              background: 'var(--bg)',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontFamily: 'var(--font-sora)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              ;(e.currentTarget as HTMLElement).style.borderColor = accent
              ;(e.currentTarget as HTMLElement).style.color = accent
            }}
            onMouseLeave={e => {
              ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
              ;(e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'
            }}
          >
            ← Send another
          </button>
        </div>
      )}
    </div>
  )
}

export default function ContactPage() {
  const { accent } = useAccent()
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '', company: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [charCount, setCharCount] = useState(0)

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('error')
      setErrorMessage('Please fill in all required fields.')
      return
    }
    if (!isValidEmail(form.email.trim())) {
      setStatus('error')
      setErrorMessage('Please enter a valid email address.')
      return
    }
    setStatus('sending')
    setErrorMessage('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          company: form.company,
        }),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok) throw new Error(data?.error || 'Failed to send')
      setStatus('sent')
      setForm({ name: '', email: '', message: '', company: '' })
      setCharCount(0)
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Try again.')
    }
  }

  const setField = (key: keyof FormState, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }))
    if (key === 'message') setCharCount(value.length)
  }

  const inputBase: React.CSSProperties = {
    width: '100%',
    padding: '11px 15px',
    borderRadius: 10,
    border: '1px solid var(--border)',
    background: 'var(--bg)',
    color: 'var(--text)',
    fontSize: '0.9rem',
    fontFamily: 'var(--font-sora)',
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  }

  const focusProps = {
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.target.style.borderColor = accent
      e.target.style.boxShadow = `0 0 0 3px color-mix(in srgb, ${accent} 12%, transparent)`
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.target.style.borderColor = 'var(--border)'
      e.target.style.boxShadow = 'none'
    },
  }

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes logSlideIn {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes popIn {
          0%   { opacity: 0; transform: scale(0.85); }
          70%  { transform: scale(1.04); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; } 50% { opacity: 0; }
        }

        .cf-1 { animation: fadeUp 0.5s ease 0.05s forwards; opacity: 0; }
        .cf-2 { animation: fadeUp 0.5s ease 0.18s forwards; opacity: 0; }
        .cf-3 { animation: fadeUp 0.5s ease 0.30s forwards; opacity: 0; }
        .cf-4 { animation: fadeUp 0.5s ease 0.42s forwards; opacity: 0; }

        .social-link {
          display: flex; align-items: center; gap: 8px;
          padding: 9px 20px;
          border-radius: 11px;
          border: 1px solid var(--border);
          background: var(--bg-card);
          color: var(--text-muted);
          font-size: 0.85rem;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .social-link:hover {
          color: var(--accent);
          border-color: var(--accent);
          transform: translateY(-3px);
          box-shadow: 0 6px 20px color-mix(in srgb, var(--accent) 15%, transparent);
          opacity: 1;
        }

        .send-btn {
          padding: 12px 28px;
          border-radius: 11px;
          border: none;
          background: var(--accent);
          color: #111;
          font-weight: 700;
          font-size: 0.9rem;
          font-family: var(--font-sora);
          cursor: pointer;
          transition: opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
          align-self: flex-end;
          display: flex;
          align-items: center;
          gap: 8px;
          position: relative;
          overflow: hidden;
        }
        .send-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 24px color-mix(in srgb, var(--accent) 35%, transparent);
        }
        .send-btn:disabled { cursor: not-allowed; opacity: 0.65; }
        .send-btn::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(255,255,255,0.1), transparent);
          pointer-events: none;
        }

        .spinner {
          width: 15px; height: 15px;
          border: 2px solid rgba(17,17,17,0.3);
          border-top-color: #111;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        .char-count {
          font-family: var(--font-jetbrains);
          font-size: 0.68rem;
          color: var(--text-muted);
          text-align: right;
          margin-top: 5px;
          transition: color 0.2s ease;
        }

        .error-msg {
          display: flex; align-items: center; gap: 8px;
          padding: 10px 14px;
          border-radius: 9px;
          background: color-mix(in srgb, #ff5565 10%, transparent);
          border: 1px solid color-mix(in srgb, #ff5565 28%, transparent);
          color: #ff7070;
          font-size: 0.85rem;
          animation: fadeIn 0.3s ease forwards;
        }
      `}</style>

      <div style={{
        minHeight: 'calc(100vh - 56px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
      }}>
        <div style={{ maxWidth: 600, width: '100%' }}>

          {/* Header */}
          <div className="cf-1" style={{ marginBottom: 36, textAlign: 'center' }}>
            <span style={{
              display: 'inline-block',
              fontFamily: 'var(--font-jetbrains)',
              fontSize: '0.78rem',
              color: accent,
              letterSpacing: '0.12em',
              marginBottom: 12,
              background: `color-mix(in srgb, ${accent} 10%, transparent)`,
              border: `1px solid color-mix(in srgb, ${accent} 25%, transparent)`,
              borderRadius: 100,
              padding: '3px 14px',
            }}>
              {'// contact'}
            </span>
            <h1 style={{
              fontSize: '2.4rem',
              fontWeight: 700,
              color: 'var(--text)',
              letterSpacing: '-1.5px',
              marginBottom: 10,
            }}>
              Get in Touch
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.93rem', lineHeight: 1.6 }}>
              Have a project in mind or just want to say hi?<br />
              I&apos;ll get back to you as soon as possible.
            </p>
          </div>

          {/* Social links */}
          <div className="cf-2" style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 32, flexWrap: 'wrap' }}>
            {SOCIAL_LINKS.map(({ label, href, svg }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="social-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d={svg} />
                </svg>
                {label}
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="cf-3" style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-jetbrains)', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
              OR SEND A MESSAGE
            </span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>

          {/* Card */}
          <div className="cf-4 card">
            {status === 'sent' ? (
              <SuccessState onReset={() => { setStatus('idle'); setErrorMessage('') }} />
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Honeypot */}
                <div style={{ display: 'none' }} aria-hidden="true">
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.company}
                    onChange={e => setField('company', e.target.value)}
                  />
                </div>

                {/* Name + Email row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <FieldLabel>NAME *</FieldLabel>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={e => setField('name', e.target.value)}
                      required
                      maxLength={100}
                      style={inputBase}
                      {...focusProps}
                    />
                  </div>
                  <div>
                    <FieldLabel>EMAIL *</FieldLabel>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={e => setField('email', e.target.value)}
                      required
                      maxLength={200}
                      style={inputBase}
                      {...focusProps}
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <FieldLabel>MESSAGE *</FieldLabel>
                  <textarea
                    placeholder="What's on your mind?"
                    value={form.message}
                    onChange={e => setField('message', e.target.value)}
                    required
                    rows={5}
                    maxLength={5000}
                    style={{ ...inputBase, resize: 'vertical', minHeight: 120 }}
                    {...focusProps}
                  />
                  <div className="char-count" style={{ color: charCount > 4500 ? '#ff7070' : undefined }}>
                    {charCount} / 5000
                  </div>
                </div>

                {/* Error */}
                {status === 'error' && (
                  <div className="error-msg">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    {errorMessage || 'Something went wrong. Try again.'}
                  </div>
                )}

                {/* Submit */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button type="submit" disabled={status === 'sending'} className="send-btn">
                    {status === 'sending' ? (
                      <>
                        <span className="spinner" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </>
  )
}
