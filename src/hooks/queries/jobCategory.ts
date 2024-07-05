import { useQuery } from '@tanstack/react-query'
import { getJobCategoryList } from '@/services/jobCategory'

export const useJobCategoryListQuery = () => {
  return useQuery({
    queryKey: ['jobCategoryList'],
    queryFn: getJobCategoryList,
  })
}
