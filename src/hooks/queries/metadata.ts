import httpClient from '@/lib/httpClient'
import { useQuery } from '@tanstack/react-query'

type Metadata = {
  url: string
  title: string
  description: string
  image: string
}

const getMetadata = async (link: string): Promise<Metadata> => {
  const { data } = await httpClient.get('/v1/metadata', {
    params: { link },
  })
  return data
}

// eslint-disable-next-line import/prefer-default-export
export const useMetadataQuery = (link: string) => {
  return useQuery<Metadata>({
    queryKey: ['metadata', link],
    queryFn: () => getMetadata(link),
  })
}
