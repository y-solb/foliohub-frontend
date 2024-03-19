import { atom } from 'recoil'

const activeAssetIdState = atom({
  key: 'activeAssetIdState',
  default: '',
})

export default activeAssetIdState
