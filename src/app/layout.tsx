import type { Metadata } from 'next'
import { Sora, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { AccentProvider } from '@/components/AccentProvider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ParticlesBackground from '@/components/ParticlesBackground'

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'M4r1os',
  url: 'https://m4rios.dev',
  logo: 'https://m4rios.dev/m4r1s.png',
}

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
  title: {
    default: 'M4r1os | Full-Stack Developer',
    template: '%s | M4r1os',
  },
  description:
    'Portfolio of Marios (M4r1os) — Full-Stack Developer building Discord bots, web apps, Minecraft mods, and open source tools. JavaScript, TypeScript, Python, Node.js.',
  keywords: [
    'Full-Stack Developer',
    'Discord Bot Developer',
    'Web Developer',
    'Minecraft Mod Developer',
    'Open Source',
    'JavaScript',
    'TypeScript',
    'Python',
    'Node.js',
    'Scripting',
    'Automation',
    'Portfolio',
    'M4r1os',
    'Marios developer',
  ],
  authors: [{ name: 'Marios', url: 'https://m4rios.dev' }],
  creator: 'M4r1os',
  applicationName: 'M4r1os Portfolio',
  metadataBase: new URL('https://m4rios.dev'),
  manifest: '/site.webmanifest',
  icons: {
    icon: [{ url: '/m4r1s.png', type: 'image/png' }],
    shortcut: ['/m4r1s.png'],
    apple: [{ url: '/m4r1s.png' }],
  },
  openGraph: {
    title: 'M4r1os | Full-Stack Developer',
    description:
      'Building Discord bots, web apps, Minecraft mods & open source tools with JavaScript, TypeScript, and Python.',
    type: 'website',
    url: 'https://m4rios.dev',
    locale: 'en_US',
    siteName: 'M4r1os Portfolio',
    images: [{
      url: '/m4r1s.png',
      width: 1200,
      height: 630,
      alt: 'M4r1os — Full-Stack Developer',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'M4r1os | Full-Stack Developer',
    description:
      'Building Discord bots, web apps, Minecraft mods & open source tools with JavaScript, TypeScript, and Python.',
    images: ['/m4r1s.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://m4rios.dev',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sora.variable} ${jetbrains.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
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
