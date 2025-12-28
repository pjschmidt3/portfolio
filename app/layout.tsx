import type { Metadata } from 'next'
import { Roboto_Flex, Open_Sans, Montserrat } from 'next/font/google'
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
    <html lang="en">
      <body
        className={`${roboto.variable} ${openSans.variable} ${montserrat.variable}`}
      >
        {children}
      </body>
    </html>
  )
}
