import Portfolio from '@/containers/portfolio/Portfolio'
import { getPortfolio } from '@/fetch/getPortfolio'
import { transformImageToCircle } from '@/lib/utils'
import { Metadata } from 'next'

type Props = {
  params: { username: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = params
  const portfolio = await getPortfolio(username)

  const metadata: Metadata = {
    title: portfolio?.displayName ?? username,
    description: portfolio?.shortBio ?? `${username}의 포트폴리오`,
  }

  if (portfolio && portfolio.thumbnail) {
    metadata.icons = {
      icon: transformImageToCircle(portfolio.thumbnail),
    }
  }

  return metadata
}

export default function UserPage({ params }: { params: { username: string } }) {
  return <Portfolio username={params.username} />
}
