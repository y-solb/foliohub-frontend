'use client'

import Button from '@/components/common/Button'
import { useDeleteAccountMutation } from '@/hooks/queries/user'
import useOpenAlertModal from '@/hooks/useOpenAlertModal'
import useOpenConfirmModal from '@/hooks/useOpenConfirmModal'
import { useRouter } from 'next/navigation'

function AccountContainer() {
  const router = useRouter()
  const { mutate } = useDeleteAccountMutation()
  const { openAlert } = useOpenAlertModal()
  const { openConfirm } = useOpenConfirmModal()

  const handleDeleteAccount = () => {
    openConfirm({
      title: '정말 탈퇴하실 건가요?',
      content: '탈퇴와 동시에 모든 데이터는 삭제되어 복구할 수 없어요. 🥲',
      onConfirm: () =>
        mutate(undefined, {
          onSuccess: () => {
            router.push('/')
            openAlert('탈퇴가 완료되었어요!', '다음에 다시 방문해 주세요. 👋')
          },
        }),
    })
  }

  return (
    <div className="flex justify-end">
      <Button variant="outlined" onClick={handleDeleteAccount}>
        탈퇴하기
      </Button>
    </div>
  )
}

export default AccountContainer
