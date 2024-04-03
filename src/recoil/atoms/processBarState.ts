import { atom } from 'recoil'

const processBarState = atom({
  key: 'processBarState',
  default: {
    isLoading: false,
    percent: 0,
  },
})

export default processBarState
