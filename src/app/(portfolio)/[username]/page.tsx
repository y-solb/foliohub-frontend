import Portfolio from '@/containers/portfolio/Portfolio'
import { fetchPortfolio } from '@/fetch/fetchPortfolio'
import { removeTagsText } from '@/lib/utils'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Props = {
  params: { username: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = params
  const portfolio = {
    thumbnail: '',
    displayName: 'displayName',
    shortBio: 'shortBio',
  }

  const title = removeTagsText(portfolio?.displayName)
  const description = portfolio?.shortBio
    ? removeTagsText(portfolio?.shortBio)
    : `${username}의 포트폴리오`
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

export default function UserPage({ params }: { params: { username: string } }) {
  return <Portfolio username={params.username} />
}
