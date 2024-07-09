import Portfolio from '@/containers/portfolio/Portfolio'
import { fetchPortfolio } from '@/fetch/fetchPortfolio'
import { removeTagsText } from '@/lib/utils'
import { getPortfolio } from '@/services/portfolio'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Props = {
  params: { username: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = params
  const portfolio = await fetchPortfolio(username)
  if (!portfolio) {
    return notFound()
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

export default async function UserPage({
  params,
}: {
  params: { username: string }
}) {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['portfolio', params.username],
    queryFn: () => getPortfolio(params.username),
    staleTime: 60 * 1000,
  })

  const dehydratedState = dehydrate(queryClient)
  return (
    <HydrationBoundary state={dehydratedState}>
      <Portfolio username={params.username} />
    </HydrationBoundary>
  )
}
