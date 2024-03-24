type PortfolioData = {
  thumbnail: string
  displayName: string
  shortBio: string
}

// eslint-disable-next-line import/prefer-default-export
export const getPortfolio = async (username: string): Promise<PortfolioData> =>
  fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/v1/portfolio/metadata?username=${username}`,
    { cache: 'no-store' },
  ).then((res) => res.json())
