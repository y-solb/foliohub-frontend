import { useSetRecoilState } from 'recoil'
import authModalState from '@/recoil/atoms/authModalState'

export default function useOpenAuthModal() {
  const setAuthModal = useSetRecoilState(authModalState)

  const openModal = () => {
    setAuthModal(true)
  }

  return openModal
}
