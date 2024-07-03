import { atom } from 'recoil'

type ConfirmType = {
  isOpen: boolean
  title: string
  content?: string
  onConfirm: (() => void) | null
}

const confirmModalState = atom<ConfirmType>({
  key: 'confirmModalState',
  default: {
    isOpen: false,
    title: '',
    content: '',
    onConfirm: null,
  },
})

export default confirmModalState
