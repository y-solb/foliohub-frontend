import { atom } from 'recoil'

type AuthInfo = {
  id: string
  email: string
  username: string
  accessToken: string
}

const authInfoState = atom<AuthInfo | null>({
  key: 'authInfoState',
  default: null,
})

export default authInfoState
