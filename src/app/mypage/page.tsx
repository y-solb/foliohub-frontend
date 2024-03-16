import BaseLayout from '@/components/layout/BaseLayout'
import Navbar from '@/containers/mypage/Navbar'
import MyProfile from '@/containers/mypage/MyProfile'
import LikePortfolioList from '@/containers/mypage/LikePortfolioList'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '마이페이지 | FolioHub',
}

export default function Mypage() {
  return (
    <BaseLayout>
      <MyProfile />
      <Navbar />
      <LikePortfolioList />
    </BaseLayout>
  )
}
