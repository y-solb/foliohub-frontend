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
  description:
    '뛰어난 당신의 이력을 나눌 수 있는 포트폴리오 서비스. 자신만의 이야기를 그려봐요.',
  keywords: ['포트폴리오', '이력서'],
  metadataBase: new URL('https://nextjs.org'),
  openGraph: {
    title: 'FolioHub',
    description:
      '뛰어난 당신의 이력을 나눌 수 있는 포트폴리오 서비스. 자신만의 이야기를 그려봐요.',
    url: 'https://nextjs.org',
    siteName: 'FolioHub',
    type: 'website',
    // images: [
    //   {
    //     url: '/foliohub_text.png', // Must be an absolute URL
    //     width: 800,
    //     height: 600,
    //   },
    // ],
  },
  twitter: {
    card: 'summary',
    title: 'FolioHub',
    description:
      '뛰어난 당신의 이력을 나눌 수 있는 포트폴리오 서비스. 자신만의 이야기를 그려봐요.',
    // images: ['/foliohub_text.png'],
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
