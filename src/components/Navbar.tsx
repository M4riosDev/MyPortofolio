'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useTheme } from './ThemeProvider'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/experience', label: 'Experience' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)')
    const update = () => setIsMobile(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    if (!isMobile) setOpen(false)
  }, [isMobile])

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 999,
        background: scrolled ? 'var(--bg)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'background 0.3s ease, border-color 0.3s ease',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '0 24px',
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            fontFamily: 'var(--font-jetbrains)',
            fontSize: '1.1rem',
            fontWeight: 700,
            color: 'var(--accent)',
            letterSpacing: '-0.5px',
          }}
        >
          <Image
            src="/m4r1s.png"
            alt="M4r1os logo"
            width={30}
            height={30}
            priority
            style={{
              borderRadius: 8,
              border: '1px solid var(--border)',
            }}
          />
          m4rios<span style={{ color: 'var(--text)', opacity: 0.4 }}>.dev</span>
        </Link>

        {!isMobile ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {NAV_LINKS.map(({ href, label }) => {
              const active = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 8,
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: active ? 'var(--accent)' : 'var(--text)',
                    background: active ? 'color-mix(in srgb, var(--accent) 10%, transparent)' : 'transparent',
                    borderBottom: active ? '2px solid var(--accent)' : '2px solid transparent',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {label}
                </Link>
              )
            })}

            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              style={{
                marginLeft: 8,
                width: 36,
                height: 36,
                borderRadius: 8,
                border: '1px solid var(--border)',
                background: 'var(--bg-card)',
                color: 'var(--text)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
                transition: 'border-color 0.2s ease',
              }}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                border: '1px solid var(--border)',
                background: 'var(--bg-card)',
                color: 'var(--text)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
              }}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            <button
              onClick={() => setOpen(o => !o)}
              aria-label="Toggle menu"
              aria-expanded={open}
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                border: '1px solid var(--border)',
                background: 'var(--bg-card)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5,
                padding: 8,
              }}
            >
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  style={{
                    display: 'block',
                    width: 18,
                    height: 2,
                    background: 'var(--text)',
                    borderRadius: 2,
                    transformOrigin: 'center',
                    transition: 'transform 0.3s ease, opacity 0.3s ease',
                    transform:
                      open && i === 0 ? 'translateY(7px) rotate(45deg)' :
                      open && i === 2 ? 'translateY(-7px) rotate(-45deg)' : 'none',
                    opacity: open && i === 1 ? 0 : 1,
                  }}
                />
              ))}
            </button>
          </div>
        )}
      </div>

      {/* Mobile dropdown */}
      <div
        style={{
          overflow: 'hidden',
          maxHeight: open ? 400 : 0,
          transition: 'max-height 0.4s ease',
          background: 'var(--bg)',
          borderBottom: open ? '1px solid var(--border)' : 'none',
        }}
      >
        <div style={{ padding: '8px 24px 20px' }}>
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                style={{
                  display: 'block',
                  padding: '12px 0',
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: active ? 'var(--accent)' : 'var(--text)',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                {label}
              </Link>
            )
          })}
        </div>
      </div>

    </nav>
  )
}
