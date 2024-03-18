import Portfolio from '@/containers/portfolio/Portfolio'
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
    icons: {
      icon: portfolio.thumbnail,
    },
  }
}

export default function UserPage({ params }: { params: { username: string } }) {
  return <Portfolio username={params.username} />
}
