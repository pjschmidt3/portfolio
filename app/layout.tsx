// import { Navigation } from '@/components/navigation/navigation'
import { Navigation } from '@/components/navigation/navigation'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import '@piducancore/fonts-andale-mono'
import { ThemeProvider } from '@/components/theme/theme-provider'
import './globals.css'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-sans' })

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
      className={roboto.variable}>
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
