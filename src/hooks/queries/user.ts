import { deleteAccount, editJobCategory, getMyInfo } from '@/services/user'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useMyQuery = () => {
  return useQuery({
    queryKey: ['myInfo'],
    queryFn: getMyInfo,
  })
}

export const useJobCategoryMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: editJobCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['myInfo'],
      })
    },
  })
}

export const useDeleteAccountMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authInfo'] })
    },
  })
}
