import { atom } from 'recoil'

type AlertType = {
  isOpen: boolean
  title: string
  content?: string
}

const alertModalState = atom<AlertType>({
  key: 'alertModalState',
  default: {
    isOpen: false,
    title: '',
    content: '',
  },
})

export default alertModalState
