import httpClient from '@/lib/httpClient'
import { AssetType } from '@/types'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Layouts } from 'react-grid-layout'

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

export const usePortfolioQuery = (userId: string) => {
  return useQuery<Portfolio>({
    queryKey: ['portfolio', userId],
    queryFn: () => getPortfolio(userId),
    enabled: !!userId,
  })
}

export const usePortfolioMutation = () => {
  return useMutation({
    mutationFn: (variables: UpdatePortfolioVariables) =>
      editPortfolio(variables),
  })
}
