import { useRecoilState } from 'recoil'
import alertModalState from '@/recoil/atoms/alertModalState'

export default function useOpenAlertModal() {
  const [alertModal, setAlertModal] = useRecoilState(alertModalState)

  const openAlert = (title: string, content?: string) => {
    setAlertModal({
      isOpen: true,
      title,
      content,
    })
  }

  const closeAlert = () => {
    setAlertModal((prev) => ({
      ...prev,
      isOpen: false,
    }))
    setTimeout(() => {
      setAlertModal((prev) => ({
        ...prev,
        title: '',
        content: '',
      }))
    }, 200)
  }

  return { alertModal, openAlert, closeAlert }
}
