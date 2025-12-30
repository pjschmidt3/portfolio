// import { Navigation } from '@/components/navigation/navigation'
import { Navigation } from '@/components/navigation/navigation'
import type { Metadata } from 'next'
import { Roboto, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/theme/theme-provider'
import './globals.css'

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
  preload: true
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
  preload: true
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
      <body>
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
