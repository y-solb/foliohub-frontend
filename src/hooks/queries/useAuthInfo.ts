import httpClient from '@/lib/httpClient'
import { AuthInfo } from '@/types'

import { useQuery } from '@tanstack/react-query'

const getAuthInfo = async (): Promise<AuthInfo> => {
  const { data } = await httpClient.get('/v1/auth')
  return data
}

export default function useAuthInfo() {
  const authInfoQuery = useQuery<AuthInfo>({
    queryKey: ['authInfo'],
    queryFn: getAuthInfo,
  })

  return { authInfoQuery }
}
