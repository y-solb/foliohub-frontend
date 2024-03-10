import httpClient from '@/lib/httpClient'
import { useQuery } from '@tanstack/react-query'

type MyInfo = {
  id: string
  username: string
  jobCategoryCode: string
  displayName: string
  thumbnail: string
  job: string
  jobCode: string
}

const getMyInfo = async (): Promise<MyInfo> => {
  const { data } = await httpClient.get('/v1/user/my')
  return data
}

export const useMyQuery = () => {
  return useQuery<MyInfo>({
    queryKey: ['myInfo'],
    queryFn: getMyInfo,
  })
}

export const abd = 'abd'
