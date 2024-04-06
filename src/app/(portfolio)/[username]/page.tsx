import Portfolio from '@/containers/portfolio/Portfolio'
import { getPortfolio } from '@/fetch/getPortfolio'
import { removeTagsText } from '@/lib/utils'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Props = {
  params: { username: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = params
  try {
    const portfolio = await getPortfolio(username)
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
  } catch (error) {
    return notFound()
  }
}

export default function UserPage({ params }: { params: { username: string } }) {
  return <Portfolio username={params.username} />
}
