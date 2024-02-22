import { AuthInfo } from '@/types'
import { atom } from 'recoil'

const authInfoState = atom<AuthInfo | null>({
  key: 'authInfoState',
  default: null,
})

export default authInfoState
