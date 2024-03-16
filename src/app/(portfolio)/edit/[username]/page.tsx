import PortfolioEditor from '@/containers/portfolio/PortfolioEditor'
import { getPortfolio } from '@/fetch/getPortfolio'
import { Metadata } from 'next'

type Props = {
  params: { username: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = params
  const portfolio = await getPortfolio(username)

  if (!portfolio) {
    return {}
  }

  return {
    title: portfolio.displayName,
    description: portfolio.shortBio,
  }
}

export default function EditPage({ params }: { params: { username: string } }) {
  return <PortfolioEditor username={params.username} />
}
