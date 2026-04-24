'use client'

import { useAccent } from '@/components/AccentProvider'

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const IconMonitor = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/>
    <path d="M8 21h8M12 17v4"/>
  </svg>
)
const IconLayers = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  </svg>
)
const IconBot = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2"/>
    <circle cx="12" cy="5" r="2"/>
    <path d="M12 7v4M8 14h.01M16 14h.01"/>
  </svg>
)
const IconGlobe = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
)
const IconExternal = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
)
const IconGitHub = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
)

// ─── Project data ──────────────────────────────────────────────────────────────
const PROJECTS = [
    {
    icon: <IconGlobe />,
    name: 'm4rios.dev',
    description: "This portfolio you're looking at right now — built with Next.js, animated with Framer Motion, and themed with a custom accent system.",
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    live: 'https://m4rios.dev',
    source: 'https://github.com/M4riosDev/MyPortofolio',
  },
  {
    icon: <IconGlobe />,
    name: 'Money Manager',
    description: "A clean, modern web app for tracking monthly budgets and expenses with minimal setup. Set a budget, log expenses by category, and instantly see your remaining balance. Built for speed, clarity, and everyday use.",
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion',"supabase"],
    live: 'https://moneymanager.m4rios.dev/',
    source: 'https://github.com/M4riosDev/Money-Manager',
  },
  {
    icon: <IconGlobe />,
    name: 'Roleplay Chats',
    description: "FiveM-style HUD & chat mod for Minecraft Forge Replaces vanilla chat with styled, icon-tagged message channels built for roleplay servers.",
    tags: ['Minecraft', 'Forge'],
    live: null,
    source: 'https://github.com/M4riosDev/BetterMChats',
  },
    {
    icon: <IconGlobe />,
    name: 'Better Rewards',
    description: "A complete promotional code system for Minecraft servers. Server administrators can create codes that reward players with items, with full control over quantities, limits, and expiration dates.",
    tags: ['Minecraft', 'Forge'],
    live: 'https://www.curseforge.com/minecraft/mc-mods/betterrewards',
    source: null,
  },
]

// ─── Single project card ───────────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  return (
    <div
      className="project-card"
      style={{ animationDelay: `${0.05 + index * 0.08}s` }}
    >
      {/* Icon */}
      <div className="project-icon">
        {project.icon}
      </div>

      {/* Name */}
      <h2 className="project-name">{project.name}</h2>

      {/* Description */}
      <p className="project-desc">{project.description}</p>

      {/* Tags */}
      <div className="project-tags">
        {project.tags.map((tag) => (
          <span key={tag} className="project-tag">{tag}</span>
        ))}
      </div>

      {/* Action buttons */}
      <div className="project-actions">
        {project.live && (
          <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-action btn-live">
            <IconExternal />
            {project.source ? 'Live' : 'Live App'}
          </a>
        )}
        {project.source && (
          <a href={project.source} target="_blank" rel="noopener noreferrer" className="btn-action btn-source">
            <IconGitHub />
            Source
          </a>
        )}
      </div>
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function ProjectsPage() {
  const { accent } = useAccent()

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Header */
        .projects-header {
          text-align: center;
          margin-bottom: 56px;
          animation: fadeUp 0.6s ease 0.05s forwards;
          opacity: 0;
        }
        .projects-label {
          display: inline-block;
          font-family: var(--font-jetbrains);
          font-size: 0.78rem;
          color: var(--accent);
          letter-spacing: 0.12em;
          margin-bottom: 14px;
        }
        .projects-title {
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 700;
          letter-spacing: -1.5px;
          color: var(--text);
          line-height: 1.1;
          margin-bottom: 14px;
        }
        .projects-sub {
          color: var(--text-muted);
          font-size: 0.95rem;
          max-width: 460px;
          margin: 0 auto;
        }

        /* Grid */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        /* Card */
        .project-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 26px 28px 22px;
          display: flex;
          flex-direction: column;
          gap: 0;
          transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
          animation: fadeUp 0.55s ease forwards;
          opacity: 0;
        }
        .project-card:hover {
          border-color: var(--accent);
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.25);
        }

        /* Icon box */
        .project-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: color-mix(in srgb, var(--accent) 10%, var(--bg-card));
          border: 1px solid color-mix(in srgb, var(--accent) 22%, var(--border));
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
          margin-bottom: 16px;
          flex-shrink: 0;
        }

        /* Name */
        .project-name {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 10px;
          letter-spacing: -0.3px;
        }

        /* Description */
        .project-desc {
          font-size: 0.875rem;
          color: var(--text-muted);
          line-height: 1.65;
          flex: 1;
          margin-bottom: 20px;
        }

        /* Tags */
        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-bottom: 20px;
        }
        .project-tag {
          font-size: 0.72rem;
          font-family: var(--font-jetbrains);
          color: var(--text-muted);
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 3px 9px;
          letter-spacing: 0.02em;
          transition: border-color 0.2s, color 0.2s;
        }
        .project-card:hover .project-tag {
          border-color: color-mix(in srgb, var(--accent) 30%, var(--border));
          color: var(--text);
        }

        /* Action buttons */
        .project-actions {
          display: flex;
          gap: 10px;
          margin-top: auto;
        }
        .btn-action {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 10px 0;
          border-radius: 10px;
          font-size: 0.82rem;
          font-weight: 500;
          text-decoration: none;
          transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
          letter-spacing: 0.01em;
        }
        .btn-action:hover {
          opacity: 1;
          transform: translateY(-2px);
        }
        .btn-live {
          background: var(--bg-card);
          border: 1px solid var(--border);
          color: var(--text);
        }
        .btn-live:hover {
          border-color: var(--accent);
          color: var(--accent);
        }
        .btn-source {
          background: var(--bg-card);
          border: 1px solid var(--border);
          color: var(--text);
        }
        .btn-source:hover {
          border-color: var(--accent);
          color: var(--accent);
        }

        /* When only one button → full width */
        .project-actions .btn-action:only-child {
          flex: 1;
        }
      `}</style>

      <div style={{ minHeight: 'calc(100vh - 56px)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>

          {/* Header */}
          <div className="projects-header">
            <span className="projects-label">{'// projects'}</span>
            <h1 className="projects-title">Things I've built</h1>
            <p className="projects-sub">A collection of projects I've worked on — from web apps to Discord bots.</p>
          </div>

          {/* Grid */}
          <div className="projects-grid">
            {PROJECTS.map((project, i) => (
              <ProjectCard key={project.name} project={project} index={i} />
            ))}
          </div>

        </div>
      </div>
    </>
  )
}