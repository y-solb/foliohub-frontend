import PortfolioEditor from '@/containers/portfolio/PortfolioEditor'
import { getPortfolio } from '@/fetch/getPortfolio'
import { Metadata } from 'next'

type Props = {
  params: { username: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = params
  const portfolio = await getPortfolio(username)
  const title = portfolio?.displayName
  const description = portfolio?.shortBio ?? `${username}의 포트폴리오`
  const thumbnail = portfolio.thumbnail
    ? portfolio.thumbnail
    : '/foliohub_logo.svg'

  const metadata: Metadata = {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: 'FolioHub',
      type: 'website',
      images: [
        {
          url: thumbnail,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title,
      description,
      images: [thumbnail],
    },
    icons: {
      icon: thumbnail,
    },
  }

  return metadata
}

export default function EditPage({ params }: { params: { username: string } }) {
  return <PortfolioEditor username={params.username} />
}
