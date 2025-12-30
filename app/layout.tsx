import { Navigation } from '@/components/navigation/navigation'
import { WebVitals } from '@/components/web-vitals'
import type { Metadata } from 'next'
import { Roboto, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/theme/theme-provider'
import './globals.css'

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
  preload: true,
  weight: ['400', '500', '700'], // Only load weights you use
  style: ['normal'], // Only normal, not italic,
  adjustFontFallback: true
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
  preload: true,
  weight: ['400', '500'],
  adjustFontFallback: true // Limit to used weights
})

export const metadata: Metadata = {
  title: 'Portfolio | Phillip Schmidt',
  description: 'Phillip Schmidt | Senior Software Developer | Portfolio'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${roboto.variable} ${geistMono.variable}`}>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          rel="dns-prefetch"
          href="https://fonts.googleapis.com"
        />
      </head>
      <body>
        <WebVitals />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange>
          <Navigation />
          <main className="w-full">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
