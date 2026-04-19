export default function Footer() {
  const currentYear = new Date().getUTCFullYear()

  return (
    <footer
      style={{
        background: 'var(--bg-card)',
        borderTop: '1px solid var(--border)',
        padding: '20px 24px',
        textAlign: 'center',
        fontSize: '0.85rem',
        color: 'var(--text-muted)',
        position: 'relative',
        zIndex: 1,
      }}
    >
      Made with{' '}
      <span style={{ color: 'var(--accent)' }}>♥</span>
      {' '}by M4r1os — <span suppressHydrationWarning>{currentYear}</span>
    </footer>
  )
}
