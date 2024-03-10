import BaseLayout from '@/components/layout/BaseLayout'
import Navbar from '@/containers/mypage/Navbar'
import MyProfile from '@/containers/mypage/MyProfile'
import PortFolioList from '@/components/portfolio/PortfolioList'

export default function Mypage() {
  return (
    <BaseLayout>
      <MyProfile />
      <Navbar />
      <PortFolioList />
    </BaseLayout>
  )
}
