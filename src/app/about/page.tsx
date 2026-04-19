'use client'

import Image from 'next/image'
import { useAccent } from '@/components/AccentProvider'

const mariosLogo = '/m4r1s.png'

const BIRTH_DATE = new Date(2007, 5, 16)

function getAgeFromBirthDate(birthDate: Date) {
  const today = new Date()
  let age = today.getUTCFullYear() - birthDate.getUTCFullYear()
  const monthDiff = today.getUTCMonth() - birthDate.getUTCMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getUTCDate() < birthDate.getUTCDate())) {
    age -= 1
  }
  return age
}

const TECH_STACK = [
  { name: 'Node.js',    icon: 'devicon-nodejs-plain',           color: '#3c873a', href: 'https://nodejs.org/' },
  { name: 'TypeScript', icon: 'devicon-typescript-plain',       color: '#3178c6', href: 'https://www.typescriptlang.org/' },
  { name: 'JavaScript', icon: 'devicon-javascript-plain',       color: '#f7df1e', href: 'https://developer.mozilla.org/docs/Web/JavaScript' },
  { name: 'React',      icon: 'devicon-react-original',         color: '#61DBFB', href: 'https://react.dev/' },
  { name: 'Next.js',    icon: 'devicon-nextjs-plain',           color: '#c6ddff', href: 'https://nextjs.org/' },
  { name: 'Express.js', icon: 'devicon-express-original',       color: '#c6ddff', href: 'https://expressjs.com/' },
  { name: 'Tailwind',   icon: 'devicon-tailwindcss-plain',      color: '#38bdf8', href: 'https://tailwindcss.com/' },
  { name: 'MongoDB',    icon: 'devicon-mongodb-plain',          color: '#47A248', href: 'https://www.mongodb.com/' },
  { name: 'Docker',     icon: 'devicon-docker-plain',           color: '#0db7ed', href: 'https://www.docker.com/' },
  { name: 'Electron',   icon: 'devicon-electron-original',      color: '#9EC9FF', href: 'https://www.electronjs.org/' },
  { name: 'Git',        icon: 'devicon-git-plain',              color: '#f34f29', href: 'https://git-scm.com/' },
  { name: 'GitHub',     icon: 'devicon-github-original',        color: 'var(--text)', href: 'https://github.com/' },
  { name: 'HTML5',      icon: 'devicon-html5-plain',            color: '#e34c26', href: 'https://developer.mozilla.org/docs/Web/HTML' },
  { name: 'CSS3',       icon: 'devicon-css3-plain',             color: '#264de4', href: 'https://developer.mozilla.org/docs/Web/CSS' },
  { name: 'Nginx',      icon: 'devicon-nginx-original',         color: '#009900', href: 'https://nginx.org/' },
  { name: 'Cloudflare', icon: 'devicon-cloudflare-plain',       color: '#F38020', href: 'https://www.cloudflare.com/' },
  { name: 'SQL',        icon: 'devicon-azuresqldatabase-plain', color: '#8FB7FF', href: 'https://www.w3schools.com/sql/' },
  { name: 'Python',     icon: 'devicon-python-plain',           color: '#3572A5', href: 'https://www.python.org/' },
  { name: 'npm',        icon: 'devicon-npm-original-wordmark',  color: '#CB3837', href: 'https://www.npmjs.com/' },
  { name: 'VS Code',    icon: 'devicon-vscode-plain',           color: '#007ACC', href: 'https://code.visualstudio.com/' },
  { name: 'Java',       icon: 'devicon-java-plain',             color: '#b07219', href: 'https://www.java.com/' },
]

const INFO_CARDS = [
  { label: 'BASED IN',   value: 'Greece / UK 🌍' },
  { label: 'EDUCATION',  value: 'Harrow College' },
  { label: 'CORE FOCUS', value: 'Discord + Web' },
  { label: 'STATUS',     value: 'Open to work ✅' },
]

const TAGS = ['Automation', 'Web Platforms', 'Discord Systems', 'Performance', 'Deployment']

export default function AboutPage() {
  const { accent } = useAccent()
  const age = getAgeFromBirthDate(BIRTH_DATE)

  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/devicon.min.css" />

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }

        .about-fade-1 { animation: fadeUp 0.55s ease 0.05s forwards; opacity: 0; }
        .about-fade-2 { animation: fadeUp 0.55s ease 0.15s forwards; opacity: 0; }
        .about-fade-3 { animation: fadeUp 0.55s ease 0.25s forwards; opacity: 0; }
        .about-fade-4 { animation: fadeUp 0.55s ease 0.35s forwards; opacity: 0; }
        .about-fade-5 { animation: fadeUp 0.55s ease 0.45s forwards; opacity: 0; }

        .info-card {
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 14px 16px;
          background: var(--bg);
          transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
        }
        .info-card:hover {
          border-color: var(--accent);
          transform: translateY(-3px);
          box-shadow: 0 6px 20px color-mix(in srgb, var(--accent) 12%, transparent);
        }

        .tech-card {
          padding: 20px 12px;
          text-align: center;
          text-decoration: none;
          display: block;
          border-radius: 14px;
          border: 1px solid var(--border);
          background: var(--bg-card);
          transition: border-color 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease;
          opacity: 0;
          animation: fadeUp 0.5s ease forwards;
        }
        .tech-card:hover {
          border-color: var(--accent);
          transform: translateY(-5px);
          box-shadow: 0 8px 24px color-mix(in srgb, var(--accent) 15%, transparent);
          opacity: 1 !important;
        }

        .tag-pill {
          padding: 5px 14px;
          border-radius: 100px;
          font-size: 0.78rem;
          font-family: var(--font-jetbrains);
          background: color-mix(in srgb, var(--accent) 10%, transparent);
          border: 1px solid color-mix(in srgb, var(--accent) 25%, transparent);
          color: var(--accent);
          transition: background 0.2s ease, transform 0.2s ease;
          cursor: default;
        }
        .tag-pill:hover {
          background: color-mix(in srgb, var(--accent) 18%, transparent);
          transform: translateY(-2px);
        }

        .section-label {
          display: inline-block;
          font-family: var(--font-jetbrains);
          font-size: 0.7rem;
          letter-spacing: 0.14em;
          color: var(--accent);
          background: color-mix(in srgb, var(--accent) 10%, transparent);
          border: 1px solid color-mix(in srgb, var(--accent) 25%, transparent);
          border-radius: 100px;
          padding: 3px 12px;
          margin-bottom: 10px;
        }

        .divider {
          height: 1px;
          background: linear-gradient(to right, transparent, var(--border), transparent);
          margin: 60px auto;
          max-width: 700px;
        }
      `}</style>

      {/* Bio section */}
      <section style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '90px 24px 50px',
      }}>
        <div style={{ maxWidth: 760, width: '100%' }}>

          {/* Header */}
          <div className="about-fade-1" style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
            <div style={{ position: 'relative' }}>
              {/* Glow behind avatar */}
              <div style={{
                position: 'absolute',
                inset: -6,
                borderRadius: 14,
                background: `radial-gradient(ellipse, color-mix(in srgb, var(--accent) 30%, transparent), transparent 70%)`,
                zIndex: 0,
              }} />
              <Image
                src={mariosLogo}
                alt="m4r1os logo"
                width={46}
                height={46}
                style={{
                  position: 'relative',
                  zIndex: 1,
                  borderRadius: 10,
                  border: `1.5px solid color-mix(in srgb, ${accent} 40%, var(--border))`,
                  boxShadow: `0 0 16px color-mix(in srgb, ${accent} 28%, transparent)`,
                }}
              />
            </div>
            <div>
              <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-jetbrains)', color: 'var(--accent)', letterSpacing: '0.1em', opacity: 0.7 }}>
                $ cat about.md
              </span>
              <h1 style={{ fontSize: '1.9rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1.1 }}>
                About Me
              </h1>
            </div>
          </div>

          {/* Bio card */}
          <div className="about-fade-2 card" style={{ marginBottom: 20 }}>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, fontSize: '1.03rem', marginBottom: 14 }}>
              Hi, I&apos;m{' '}
              <strong style={{ color: accent }}>Marios</strong>
              {' '}(also known as{' '}
              <span style={{ fontFamily: 'var(--font-jetbrains)', color: 'var(--text)', fontSize: '0.95rem' }}>m4r1os</span>
              ), a Full-Stack Web Developer from Greece.
              I&apos;m currently{' '}
              <strong style={{ color: 'var(--text)' }}><span suppressHydrationWarning>{age}</span> years old</strong>
              {' '}and have been programming for over 4 years.
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, fontSize: '1.03rem', marginBottom: 14 }}>
              I focus on building scalable and intuitive platforms that combine Discord automation with modern web systems.
              My work includes custom dashboards, roleplay and staff-management tools, and practical business workflows.
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, fontSize: '1.03rem', marginBottom: 22 }}>
              Even with a tight schedule, I keep shipping real systems, learning from feedback loops, and improving performance and deployment quality.
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {TAGS.map(tag => (
                <span key={tag} className="tag-pill">{tag}</span>
              ))}
            </div>
          </div>

          {/* Info grid */}
          <div className="about-fade-3" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 10,
          }}>
            {INFO_CARDS.map(({ label, value }) => (
              <div key={label} className="info-card">
                <p style={{
                  color: accent,
                  fontSize: '0.68rem',
                  letterSpacing: '0.1em',
                  fontFamily: 'var(--font-jetbrains)',
                  marginBottom: 6,
                  opacity: 0.85,
                }}>
                  {label}
                </p>
                <p style={{ color: 'var(--text)', fontSize: '0.88rem', fontWeight: 600 }}>
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Tech stack section */}
      <section style={{ padding: '0 24px 100px' }}>
        <div style={{ maxWidth: 920, margin: '0 auto', textAlign: 'center' }}>

          <div className="about-fade-4" style={{ marginBottom: 40 }}>
            <div className="section-label">TOOLS & TECHNOLOGIES</div>
            <h2 style={{ fontSize: '1.55rem', fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>
              Languages &amp; Technologies
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Tools I use on a regular basis
            </p>
          </div>

          <div className="about-fade-5" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(108px, 1fr))',
            gap: 12,
          }}>
            {TECH_STACK.map(({ name, icon, color, href }, i) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="tech-card"
                style={{ animationDelay: `${i * 35}ms` }}
              >
                <i className={icon} style={{ fontSize: '2.1rem', color, display: 'block', marginBottom: 9 }} />
                <span style={{ fontSize: '0.71rem', color: 'var(--text-muted)', fontWeight: 500 }}>{name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
