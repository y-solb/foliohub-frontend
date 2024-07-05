import API_ENDPOINTS from '@/constants/apiEndpoints'

type PortfolioData = {
  thumbnail: string
  displayName: string
  shortBio: string
}

export const fetchPortfolio = async (
  username: string,
): Promise<PortfolioData | null> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}${API_ENDPOINTS.PORTFOLIO.METADATA(username)}`,
    { cache: 'no-store' },
  )

  if (res.status !== 200) {
    return null
  }
  return {
    thumbnail: '',
    displayName: 'displayName',
    shortBio: 'shortBio',
  }
}
