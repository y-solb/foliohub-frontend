import BaseLayout from '@/components/layout/BaseLayout'
import RecentPortfolioList from '@/containers/main/RecentPortfolioList'
import { getPortfolioList } from '@/services/portfolio'
import { IoChatbubblesOutline } from 'react-icons/io5'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import ButtonLink from '@/components/common/ButtonLink'

export default async function Home() {
  const queryClient = new QueryClient()
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['portfolioList'],
    queryFn: ({ pageParam }) => getPortfolioList(pageParam as number),
    initialPageParam: 1,
    staleTime: 30 * 1000,
  })
  const dehydratedState = dehydrate(queryClient)
  return (
    <BaseLayout>
      <HydrationBoundary state={dehydratedState}>
        <RecentPortfolioList />
        <ButtonLink
          href="https://docs.google.com/forms/d/e/1FAIpQLSf_FDChmWIm80RdOI_KIdg1OuUirjRGwklAXe89zpKclqH_Zg/viewform?usp=sf_link"
          target="_blank"
          className="fixed right-4 bottom-4 round-full w-14 h-14 p-0"
        >
          <IoChatbubblesOutline size={24} />
        </ButtonLink>
      </HydrationBoundary>
    </BaseLayout>
  )
}
