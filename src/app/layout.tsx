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
