'use client'

import { useState } from 'react'
import { useAccent } from '@/components/AccentProvider'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactPage() {
  const { accent } = useAccent()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    try {
      const { default: emailjs } = await import('@emailjs/browser')
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        { from_name: form.name, from_email: form.email, message: form.message, to_name: 'Marios' },
        'YOUR_PUBLIC_KEY'
      )
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const inp = {
    width: '100%', padding: '12px 16px', borderRadius: 10,
    border: '1px solid var(--border)', background: 'var(--bg)',
    color: 'var(--text)', fontSize: '0.9rem', fontFamily: 'var(--font-sora)',
    outline: 'none', transition: 'border-color 0.2s ease',
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 56px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px' }}>
      <div style={{ maxWidth: 600, width: '100%' }}>
        <div style={{ marginBottom: 40, textAlign: 'center' }}>
          <span style={{ display: 'inline-block', fontFamily: 'var(--font-jetbrains)', fontSize: '0.8rem', color: accent, letterSpacing: '0.1em', marginBottom: 12 }}>
            // contact
          </span>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--text)', letterSpacing: '-1px', marginBottom: 12 }}>
            Get in Touch
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Have a project in mind or just want to say hi?
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 36, flexWrap: 'wrap' }}>
          {[
            { label: 'Discord', href: 'https://discord.com/users/930463180189204561', icon: '💬' },
            { label: 'GitHub', href: 'https://github.com/M4riosDev', icon: '🐙' },
          ].map(({ label, href, icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 18px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 500, transition: 'all 0.2s ease', textDecoration: 'none' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = accent; el.style.borderColor = accent }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'var(--text-muted)'; el.style.borderColor = 'var(--border)' }}
            >{icon} {label}</a>
          ))}
        </div>

        <div className="card">
          {status === 'sent' ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: 16 }}>✅</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>Message sent!</h3>
              <p style={{ color: 'var(--text-muted)' }}>I&apos;ll get back to you as soon as possible.</p>
              <button onClick={() => setStatus('idle')} style={{ marginTop: 20, padding: '8px 20px', borderRadius: 8, border: `1px solid ${accent}`, background: 'transparent', color: accent, cursor: 'pointer', fontSize: '0.875rem' }}>
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {[
                { key: 'name', label: 'NAME', placeholder: 'Your name', type: 'text' },
                { key: 'email', label: 'EMAIL', placeholder: 'your@email.com', type: 'email' },
              ].map(({ key, label, placeholder, type }) => (
                <div key={key}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6, letterSpacing: '0.08em', fontFamily: 'var(--font-jetbrains)' }}>{label}</label>
                  <input type={type} placeholder={placeholder} value={(form as any)[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} required
                    style={inp}
                    onFocus={e => (e.target.style.borderColor = accent)}
                    onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6, letterSpacing: '0.08em', fontFamily: 'var(--font-jetbrains)' }}>MESSAGE</label>
                <textarea placeholder="What's on your mind?" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required rows={5}
                  style={{ ...inp, resize: 'none' } as any}
                  onFocus={e => (e.target.style.borderColor = accent)}
                  onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>
              {status === 'error' && <p style={{ color: '#ff7070', fontSize: '0.85rem' }}>⚠️ Something went wrong. Check your EmailJS credentials or try again.</p>}
              <button type="submit" disabled={status === 'sending'}
                style={{ padding: '12px 28px', borderRadius: 10, border: 'none', background: accent, color: '#111', fontWeight: 700, fontSize: '0.9rem', fontFamily: 'var(--font-sora)', cursor: status === 'sending' ? 'not-allowed' : 'pointer', opacity: status === 'sending' ? 0.7 : 1, transition: 'opacity 0.2s ease, transform 0.2s ease', alignSelf: 'flex-end' }}
                onMouseEnter={e => { if (status !== 'sending') (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
              >
                {status === 'sending' ? 'Sending...' : 'Send Message →'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
