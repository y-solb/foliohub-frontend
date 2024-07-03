import BaseLayout from '@/components/layout/BaseLayout'
import MyProfile from '@/containers/mypage/MyProfile'
import Navbar from '@/containers/mypage/Navbar'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '마이페이지 | FolioHub',
}

interface MypageLayoutProps {
  children: React.ReactNode
}

export default function MypageLayout({ children }: MypageLayoutProps) {
  return (
    <BaseLayout>
      <MyProfile />
      <Navbar />
      {children}
    </BaseLayout>
  )
}
