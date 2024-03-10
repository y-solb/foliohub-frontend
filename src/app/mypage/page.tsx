import BaseLayout from '@/components/layout/BaseLayout'
import Navbar from '@/containers/mypage/Navbar'
import MyProfile from '@/containers/mypage/MyProfile'
import LikePortfolioList from '@/containers/mypage/LikePortfolioList'

export default function Mypage() {
  return (
    <BaseLayout>
      <MyProfile />
      <Navbar />
      <LikePortfolioList />
    </BaseLayout>
  )
}
