import httpClient from '@/lib/httpClient'
import { AssetType } from '@/types'
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { Layouts } from 'react-grid-layout'

type PortfolioItem = {
  id: string
  displayName: string
  shortBio: string
  thumbnail: string
  userId: string
  updatedAt: string
}
type PortfolioData = {
  data: PortfolioItem[]
  meta: {
    currentPage: number
    hasNextPage: boolean
    lastPage: number
    total: number
  }
}
type Portfolio = {
  id: string
  displayName: string
  shortBio: string
  thumbnail: string
  assets: AssetType[]
  layout: Layouts
}
type UpdatePortfolioVariables = {
  userId: string
  updatedPortfolio: Portfolio
}

const getPortfolioList = async (pageParam: number): Promise<PortfolioData> => {
  const { data } = await httpClient.get('/v1/portfolio/list', {
    params: {
      page: pageParam,
      count: 3,
    },
  })
  return data
}

const getPortfolio = async (userId: string): Promise<Portfolio> => {
  const { data } = await httpClient.get(`/v1/portfolio/${userId}`)
  return data
}

const editPortfolio = async ({
  userId,
  updatedPortfolio,
}: UpdatePortfolioVariables) => {
  const { data } = await httpClient.put(`/v1/portfolio/${userId}`, {
    ...updatedPortfolio,
  })
  return data
}

export const useInfinitePortfolioQuery = () => {
  return useInfiniteQuery<PortfolioData, Error, InfiniteData<PortfolioData>>({
    queryKey: ['portfolioList'],
    queryFn: ({ pageParam }) => getPortfolioList(pageParam as number),
    getNextPageParam: (lastPage) => {
      const {
        meta: { currentPage, hasNextPage },
      } = lastPage
      return hasNextPage ? currentPage + 1 : undefined
    },
    initialPageParam: 1,
  })
}

export const usePortfolioQuery = (userId: string) => {
  return useQuery<Portfolio>({
    queryKey: ['portfolio', userId],
    queryFn: () => getPortfolio(userId),
    enabled: !!userId,
  })
}

export const usePortfolioMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (variables: UpdatePortfolioVariables) =>
      editPortfolio(variables),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['portfolio', variables.userId],
      })
    },
  })
}
