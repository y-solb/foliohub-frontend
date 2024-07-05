import API_ENDPOINTS from '@/constants/apiEndpoints'
import axios from 'axios'

const httpClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_HOST}`,
  withCredentials: true,
})

let isTokenRefreshing = false
let refreshSubscribers: (() => void)[] = []

const onTokenRefreshed = () => {
  refreshSubscribers.forEach((callback) => callback())
}

const addRefreshSubscriber = (callback: () => void) => {
  refreshSubscribers.push(callback)
}

httpClient.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const { config, response } = error

    if (response && response.status === 401) {
      // token이 재발급 되는 동안의 요청은 refreshSubscribers에 저장
      const retryOriginalRequest = new Promise((resolve) => {
        addRefreshSubscriber(() => {
          resolve(httpClient(config))
        })
      })

      if (!isTokenRefreshing) {
        isTokenRefreshing = true
        try {
          await httpClient.post(API_ENDPOINTS.AUTH.REFRESH)

          isTokenRefreshing = false
          onTokenRefreshed()
          refreshSubscribers = []
        } catch (e) {
          isTokenRefreshing = false
          refreshSubscribers = []
        }
      }

      return retryOriginalRequest
    }
    return Promise.reject(error)
  },
)
export default httpClient
