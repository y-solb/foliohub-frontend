import httpClient from '@/lib/httpClient'
import { useQuery } from '@tanstack/react-query'

type MyInfoData = {
  id: string
  username: string
  jobCategoryCode: string
  displayName: string
  thumbnail: string
  job: string
  jobCode: string
}

const getMyInfo = async (): Promise<MyInfoData> => {
  const { data } = await httpClient.get('/v1/user/my')
  return data
}

export const useMyQuery = () => {
  return useQuery<MyInfoData>({
    queryKey: ['myInfo'],
    queryFn: getMyInfo,
  })
}

export const abd = 'abd'
