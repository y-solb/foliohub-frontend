import httpClient from '@/lib/httpClient'
import API_ENDPOINTS from '@/constants/apiEndpoints'
import { AssetType, PortfolioItemType, SocialLinks } from '@/types'
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { Layouts } from 'react-grid-layout'

type PortfolioData = {
  data: PortfolioItemType[]
  meta: {
    currentPage: number
    hasNextPage: boolean
    lastPage: number
    total: number
  }
}
export type PortfolioView = {
  id: string
  username: string
  displayName: string
  shortBio: string
  thumbnail: string
  isLike: boolean
  likeCount: number
  assets: AssetType[]
  layout: Layouts
  socialLink: SocialLinks
}
type UpdatePortfolioVariables = {
  username: string
  updatedPortfolio: PortfolioView
}
type UpdatelikePortfolioVariables = {
  portfolioId: string
  username: string
}

export const getPortfolioList = async (
  pageParam: number,
): Promise<PortfolioData> => {
  const { data } = await httpClient.get(API_ENDPOINTS.PORTFOLIO.LIST, {
    params: {
      page: pageParam,
      count: 12,
    },
  })
  return data
}

const getLikePortfolioList = async (
  pageParam: number,
): Promise<PortfolioData> => {
  const { data } = await httpClient.get(API_ENDPOINTS.PORTFOLIO.LIKELIST, {
    params: {
      page: pageParam,
      count: 12,
    },
  })
  return data
}

const getPortfolio = async (username: string): Promise<PortfolioView> => {
  const { data } = await httpClient.get(
    API_ENDPOINTS.PORTFOLIO.DETAIL(username),
  )
  return data
}

const editPortfolio = async ({
  username,
  updatedPortfolio,
}: UpdatePortfolioVariables) => {
  const { data } = await httpClient.put(
    API_ENDPOINTS.PORTFOLIO.DETAIL(username),
    {
      ...updatedPortfolio,
    },
  )
  return data
}

const likePortfolio = async (
  portfolioId: UpdatelikePortfolioVariables['portfolioId'],
) => {
  const { data } = await httpClient.post(
    API_ENDPOINTS.PORTFOLIO.LIKE(portfolioId),
  )
  return data
}

const unlikePortfolio = async (
  portfolioId: UpdatelikePortfolioVariables['portfolioId'],
) => {
  const { data } = await httpClient.post(
    API_ENDPOINTS.PORTFOLIO.UNLIKE(portfolioId),
  )
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
    staleTime: 30 * 1000,
  })
}

export const useInfiniteLikePortfolioQuery = () => {
  return useInfiniteQuery<PortfolioData, Error, InfiniteData<PortfolioData>>({
    queryKey: ['likePortfolioList'],
    queryFn: ({ pageParam }) => getLikePortfolioList(pageParam as number),
    getNextPageParam: (lastPage) => {
      const {
        meta: { currentPage, hasNextPage },
      } = lastPage
      return hasNextPage ? currentPage + 1 : undefined
    },
    initialPageParam: 1,
  })
}

export const usePortfolioQuery = (username: string) => {
  return useQuery<PortfolioView>({
    queryKey: ['portfolio', username],
    queryFn: () => getPortfolio(username),
    enabled: !!username,
  })
}

export const usePortfolioMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (variables: UpdatePortfolioVariables) =>
      editPortfolio(variables),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['portfolio', variables.username],
      })
      queryClient.invalidateQueries({ queryKey: ['authInfo'] })
    },
  })
}

export const useLikePorfolioMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (variables: UpdatelikePortfolioVariables) =>
      likePortfolio(variables.portfolioId),
    onMutate: async (newData) => {
      await queryClient.cancelQueries({
        queryKey: ['portfolio', newData.username],
      })

      const prevPortfolio = queryClient.getQueryData<PortfolioView>([
        'portfolio',
        newData.username,
      ])
      if (!prevPortfolio) return undefined

      queryClient.setQueryData<PortfolioView>(['portfolio', newData.username], {
        ...prevPortfolio,
        isLike: true,
        likeCount: prevPortfolio.likeCount + 1,
      })

      return { prevPortfolio, newData }
    },
    onError: (_, __, context) => {
      if (!context) return
      queryClient.setQueryData(
        ['portfolio', context.newData.username],
        context.prevPortfolio,
      )
    },
    onSettled: (newData) => {
      queryClient.invalidateQueries({
        queryKey: ['portfolio', newData.username],
      })
    },
  })
}

export const useUnlikePorfolioMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (variables: UpdatelikePortfolioVariables) =>
      unlikePortfolio(variables.portfolioId),
    onMutate: async (newData) => {
      await queryClient.cancelQueries({
        queryKey: ['portfolio', newData.username],
      })

      const prevPortfolio = queryClient.getQueryData<PortfolioView>([
        'portfolio',
        newData.username,
      ])
      if (!prevPortfolio) return undefined

      queryClient.setQueryData<PortfolioView>(['portfolio', newData.username], {
        ...prevPortfolio,
        isLike: false,
        likeCount: prevPortfolio.likeCount - 1,
      })

      return { prevPortfolio, newData }
    },
    onError: (_, __, context) => {
      if (!context) return
      queryClient.setQueryData(
        ['portfolio', context.newData.username],
        context.prevPortfolio,
      )
    },
    onSettled: (newData) => {
      queryClient.invalidateQueries({
        queryKey: ['portfolio', newData.username],
      })
    },
  })
}
