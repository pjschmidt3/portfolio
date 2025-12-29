// import { Navigation } from '@/components/navigation/navigation'
import { Navigation } from '@/components/navigation/navigation'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@piducancore/fonts-andale-mono'
import { ThemeProvider } from '@/components/theme/theme-provider'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin']
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
      suppressHydrationWarning>
      <body className={`${inter.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange>
          <header className="sticky top-0 h-12 z-50 w-full bg-primary/95 shadow-sm backdrop-blur-sm px-2 space-x-2">
            <Navigation />
          </header>
          <main className="flex w-full">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
