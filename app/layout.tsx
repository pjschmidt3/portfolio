import Navigation from '@/components/navigation/Navigation'
import type { Metadata } from 'next'
import { Roboto_Flex, Open_Sans, Montserrat } from 'next/font/google'
import ThemeProvider from '@/components/theme/ThemeProvider'
import './globals.css'

const roboto = Roboto_Flex({
  variable: '--font-roboto',
  subsets: ['latin']
})

const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin']
})

const montserrat = Montserrat({
  variable: '--font-montserrat',
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
      <body
        className={`${roboto.variable} ${openSans.variable} ${montserrat.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange>
          <Navigation />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
