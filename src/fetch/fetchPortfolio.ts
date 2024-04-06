type PortfolioData = {
  thumbnail: string
  displayName: string
  shortBio: string
}

// eslint-disable-next-line import/prefer-default-export
export const fetchPortfolio = async (
  username: string,
): Promise<PortfolioData | null> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/v1/portfolio/metadata?username=${username}`,
    { cache: 'no-store' },
  )

  if (res.status !== 200) {
    return null
  }
  return res.json()
}
