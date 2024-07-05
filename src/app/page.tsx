import BaseLayout from '@/components/layout/BaseLayout'
import RecentPortfolioList from '@/containers/main/RecentPortfolioList'
import { getPortfolioList } from '@/services/portfolio'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'

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
      </HydrationBoundary>
    </BaseLayout>
  )
}
