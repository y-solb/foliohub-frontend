import { atom } from 'recoil'

const progressBarState = atom({
  key: 'progressBarState',
  default: {
    isLoading: false,
    percent: 0,
  },
})

export default progressBarState
