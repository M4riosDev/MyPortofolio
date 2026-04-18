'use client'

import { useEffect, useId, useState } from 'react'
import { useAccent } from './AccentProvider'

export default function ParticlesBackground() {
  const [ready, setReady] = useState(false)
  const particlesId = 'tsparticles-bg'
  const { accent } = useAccent()

  useEffect(() => {
    let destroyed = false
    const init = async () => {
      const { initParticlesEngine } = await import('@tsparticles/react')
      const { loadSlim } = await import('@tsparticles/slim')
      await initParticlesEngine(async engine => { await loadSlim(engine) })
      if (!destroyed) setReady(true)
    }
    init()
    return () => { destroyed = true }
  }, [])

  useEffect(() => {
    if (!ready) return
    const load = async () => {
      // @ts-ignore
      if (window.tsParticles) {
        // @ts-ignore
        const existing = window.tsParticles.domItem(0)
        if (existing) existing.destroy()
        // @ts-ignore
        await window.tsParticles.load({
          id: particlesId,
          options: {
            fullScreen: { enable: false },
            background: { color: { value: 'transparent' } },
            fpsLimit: 60,
            particles: {
              number: { value: 90, density: { enable: true } },
              color: { value: accent },
              links: { enable: true, color: accent, distance: 100, opacity: 0.3, width: 1.2 },
              opacity: { value: { min: 0.1, max: 0.4 }, animation: { enable: true, speed: 0.8 } },
              size: { value: { min: 0.5, max: 2.5 }, animation: { enable: true, speed: 3 } },
              move: { enable: true, speed: 1.5, direction: 'none', random: true, outModes: { default: 'bounce' } },
            },
            interactivity: {
              events: { onHover: { enable: true, mode: 'grab' }, onClick: { enable: true, mode: 'push' } },
              modes: { grab: { distance: 150, links: { opacity: 0.8 } }, push: { quantity: 3 } },
            },
            detectRetina: true,
          },
        })
      }
    }
    load()
  }, [ready, accent])

  return (
    <div
      id={particlesId}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  )
}
