import {
  editPortfolio,
  getLikePortfolioList,
  getPortfolio,
  getPortfolioList,
  likePortfolio,
  unlikePortfolio,
} from '@/services/portfolio'
import {
  PortfolioDetailResponse,
  UpdatelikePortfolioPayload,
} from '@/services/portfolio/type'
import {
  UseQueryOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

export const useInfinitePortfolioQuery = () => {
  return useInfiniteQuery({
    queryKey: ['portfolioList'],
    queryFn: ({ pageParam }) => getPortfolioList(pageParam),
    getNextPageParam: (lastPage) => {
      const {
        meta: { currentPage, hasNextPage },
      } = lastPage
      return hasNextPage ? currentPage + 1 : undefined
    },
    initialPageParam: 1,
    staleTime: 60 * 1000,
  })
}

export const useInfiniteLikePortfolioQuery = () => {
  return useInfiniteQuery({
    queryKey: ['likePortfolioList'],
    queryFn: ({ pageParam }) => getLikePortfolioList(pageParam),
    getNextPageParam: (lastPage) => {
      const {
        meta: { currentPage, hasNextPage },
      } = lastPage
      return hasNextPage ? currentPage + 1 : undefined
    },
    initialPageParam: 1,
  })
}

export const usePortfolioQuery = <
  TData = PortfolioDetailResponse,
  TError = unknown,
>(
  username: string,
  options?: Omit<
    UseQueryOptions<PortfolioDetailResponse, TError, TData>,
    'queryKey'
  >,
) => {
  return useQuery({
    queryKey: ['portfolio', username],
    queryFn: () => getPortfolio(username),
    staleTime: 60 * 1000,
    enabled: !!username && options?.enabled,
    ...options,
  })
}

export const usePortfolioMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: editPortfolio,
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
    mutationFn: (variables: UpdatelikePortfolioPayload) =>
      likePortfolio(variables.portfolioId),
    onMutate: async (newData) => {
      await queryClient.cancelQueries({
        queryKey: ['portfolio', newData.username],
      })

      const prevPortfolio = queryClient.getQueryData<PortfolioDetailResponse>([
        'portfolio',
        newData.username,
      ])
      if (!prevPortfolio) return undefined

      queryClient.setQueryData<PortfolioDetailResponse>(
        ['portfolio', newData.username],
        {
          ...prevPortfolio,
          isLike: true,
          likeCount: prevPortfolio.likeCount + 1,
        },
      )

      return { prevPortfolio, newData }
    },
    onError: (_, __, context) => {
      if (!context) return
      queryClient.setQueryData(
        ['portfolio', context.newData.username],
        context.prevPortfolio,
      )
    },
    onSettled: (_, __, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['portfolio', variables.username],
      })
    },
  })
}

export const useUnlikePorfolioMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (variables: UpdatelikePortfolioPayload) =>
      unlikePortfolio(variables.portfolioId),
    onMutate: async (newData) => {
      await queryClient.cancelQueries({
        queryKey: ['portfolio', newData.username],
      })

      const prevPortfolio = queryClient.getQueryData<PortfolioDetailResponse>([
        'portfolio',
        newData.username,
      ])
      if (!prevPortfolio) return undefined

      queryClient.setQueryData<PortfolioDetailResponse>(
        ['portfolio', newData.username],
        {
          ...prevPortfolio,
          isLike: false,
          likeCount: prevPortfolio.likeCount - 1,
        },
      )

      return { prevPortfolio, newData }
    },
    onError: (_, __, context) => {
      if (!context) return
      queryClient.setQueryData(
        ['portfolio', context.newData.username],
        context.prevPortfolio,
      )
    },
    onSettled: (_, __, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['portfolio', variables.username],
      })
    },
  })
}
