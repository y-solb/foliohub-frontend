import { useRecoilState } from 'recoil'
import confirmModalState from '@/recoil/atoms/confirmModalState'

export default function useOpenConfirmModal() {
  const [confirmModal, setConfirmModal] = useRecoilState(confirmModalState)

  const openConfirm = ({
    title,
    onConfirm,
    content,
  }: {
    title: string
    onConfirm: () => void
    content?: string
  }) => {
    setConfirmModal({
      isOpen: true,
      title,
      content,
      onConfirm,
    })
  }

  const closeConfirm = () => {
    setConfirmModal((prev) => ({
      ...prev,
      isOpen: false,
    }))
    setTimeout(() => {
      setConfirmModal((prev) => ({
        ...prev,
        title: '',
        content: '',
        onConfirm: null,
      }))
    }, 200)
  }

  return { confirmModal, openConfirm, closeConfirm }
}
