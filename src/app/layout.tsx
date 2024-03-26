import type { Metadata } from 'next'
import { Noto_Sans_KR, Noto_Sans } from 'next/font/google'
import './globals.css'
import CoreProvider from '@/providers/CoreProvider'

const notoKr = Noto_Sans_KR({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--noto_sans_kr',
})

const noto = Noto_Sans({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--noto_sans',
})

export const metadata: Metadata = {
  title: 'FolioHub',
  description: '당신의 여정을 기록하고, 성장을 공유해 봐요!',
  keywords: ['포트폴리오', '이력서'],
  metadataBase: new URL('https://www.foliohub.me'),
  openGraph: {
    title: 'FolioHub',
    description: '당신의 여정을 기록하고, 성장을 공유해 봐요!',
    url: 'https://www.foliohub.me',
    siteName: 'FolioHub',
    type: 'website',
    images: [
      {
        url: '/foliohub_logo.svg',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'FolioHub',
    description: '당신의 여정을 기록하고, 성장을 공유해 봐요!',
    images: ['/foliohub_logo.svg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`${notoKr.className} ${noto.className}`}>
        <CoreProvider>{children}</CoreProvider>
      </body>
    </html>
  )
}
