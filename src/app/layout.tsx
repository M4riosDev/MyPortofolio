import type { Metadata } from 'next'
import { Sora, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { AccentProvider } from '@/components/AccentProvider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ParticlesBackground from '@/components/ParticlesBackground'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'M4r1os — Discord Bot & Web Developer',
  description:
    'Portfolio of Marios (M4r1os) — a Discord Bot Developer and Web Developer with experience in JavaScript, Python, Node.js, and more.',
  keywords: ['Discord Bot Developer', 'Web Developer', 'JavaScript', 'Python', 'Node.js', 'Portfolio'],
  openGraph: {
    title: 'M4r1os — Discord Bot & Web Developer',
    description: 'Portfolio of Marios (M4r1os) — Discord Bot Developer and Web Developer.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'M4r1os — Discord Bot & Web Developer',
    description: 'Portfolio of Marios (M4r1os) — Discord Bot Developer and Web Developer.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sora.variable} ${jetbrains.variable} font-sans antialiased`}>
        <ThemeProvider>
          <AccentProvider>
            <ParticlesBackground />
            <Navbar />
            <main style={{ position: 'relative', zIndex: 1 }}>
              {children}
            </main>
            <Footer />
          </AccentProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
