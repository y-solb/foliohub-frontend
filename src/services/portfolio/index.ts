import httpClient from '@/lib/httpClient'
import API_ENDPOINTS from '@/constants/apiEndpoints'
import {
  PortfolioDetailResponse,
  PortfolioListResponse,
  UpdatePortfolioResponse,
  UpdatePortfolioVariables,
  UpdatelikePortfolioResponse,
} from './type'

export const getPortfolioList = async (pageParam: number) => {
  const { data } = await httpClient.get<PortfolioListResponse>(
    API_ENDPOINTS.PORTFOLIO.LIST,
    {
      params: {
        page: pageParam,
        count: 12,
      },
    },
  )
  return data
}

export const getLikePortfolioList = async (pageParam: number) => {
  const { data } = await httpClient.get<PortfolioListResponse>(
    API_ENDPOINTS.PORTFOLIO.LIKELIST,
    {
      params: {
        page: pageParam,
        count: 12,
      },
    },
  )
  return data
}

export const getPortfolio = async (username: string) => {
  const { data } = await httpClient.get<PortfolioDetailResponse>(
    API_ENDPOINTS.PORTFOLIO.DETAIL(username),
  )
  return data
}

export const editPortfolio = async ({
  username,
  updatedPortfolio,
}: UpdatePortfolioVariables) => {
  const { data } = await httpClient.put<UpdatePortfolioResponse>(
    API_ENDPOINTS.PORTFOLIO.DETAIL(username),
    {
      ...updatedPortfolio,
    },
  )
  return data
}

export const likePortfolio = async (portfolioId: string) => {
  const { data } = await httpClient.post<UpdatelikePortfolioResponse>(
    API_ENDPOINTS.PORTFOLIO.LIKE(portfolioId),
  )
  return data
}

export const unlikePortfolio = async (portfolioId: string) => {
  const { data } = await httpClient.post<UpdatelikePortfolioResponse>(
    API_ENDPOINTS.PORTFOLIO.UNLIKE(portfolioId),
  )
  return data
}
