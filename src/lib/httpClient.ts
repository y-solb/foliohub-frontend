import axios from 'axios'

const httpClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_HOST}`,
  withCredentials: true,
})

let isTokenRefreshing = false
let refreshSubscribers: (() => void)[] = []

const onTokenRefreshed = () => {
  refreshSubscribers.map((callback) => callback())
  refreshSubscribers = []
}

const addRefreshSubscriber = (callback: () => void) => {
  refreshSubscribers.push(callback)
}

httpClient.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error
    const originalRequest = config
    if (status === 401) {
      // token이 재발급 되는 동안의 요청은 refreshSubscribers에 저장
      const retryOriginalRequest = new Promise((resolve) => {
        addRefreshSubscriber(() => {
          resolve(httpClient(originalRequest))
        })
      })
      if (!isTokenRefreshing) {
        isTokenRefreshing = true

        await httpClient.post('/v1/auth/refresh')

        isTokenRefreshing = false
        onTokenRefreshed()
      }

      return retryOriginalRequest
    }
    return Promise.reject(error)
  },
)
export default httpClient
