import { AssetType, PortfolioItemType, SocialLinks } from '@/types'
import { Layouts } from 'react-grid-layout'

export interface PortfolioListResponse {
  data: PortfolioItemType[]
  meta: {
    currentPage: number
    hasNextPage: boolean
    lastPage: number
    total: number
  }
}

export interface PortfolioDetailResponse {
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

export interface UpdatePortfolioVariables {
  username: string
  updatedPortfolio: PortfolioDetailResponse
}

export interface UpdatePortfolioResponse {
  success: boolean
  message: string
}

export interface UpdatelikePortfolioPayload {
  portfolioId: string
  username: string
}

export interface UpdatelikePortfolioResponse {
  success: boolean
  message: string
  isLike: boolean
  likeCount: number
}
