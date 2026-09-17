import type { Metadata } from 'next'
import { Fraunces, Geist_Mono, Outfit } from 'next/font/google'
import './globals.css'

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
})

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: '%s | Fluenciel Language Studio',
    default: 'Fluenciel Language Studio — French, with structure and care',
  },
  description:
    'Fluenciel Language Studio is a French language academy for students and professionals. Explore CEFR levels, courses, fees, and book a free demo.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'Fluenciel Language Studio',
    title: 'Fluenciel Language Studio',
    description:
      'Structured French learning for communication, study, work, and travel. Book a free demo.',
    url: siteUrl,
    images: [{ url: '/brand/logo.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fluenciel Language Studio',
    description: 'Structured French learning. Book a free demo.',
    images: ['/brand/logo.jpg'],
  },
  icons: { icon: '/brand/logo.jpg', apple: '/brand/logo.jpg' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${fraunces.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  )
}
