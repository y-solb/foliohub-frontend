const API_ENDPOINTS = {
  /* auth */
  AUTH: {
    REGISTER: '/v1/auth/register',
    GOOGLE: '/v1/auth/redirect/google',
    EXPERIENCE: '/v1/auth/experience',
    LOGOUT: '/v1/auth/logout',
    USER: '/v1/auth',
    REFRESH: '/v1/auth/refresh',
  },

  /* job-category */
  JOBCATEGORY: {
    ALL: '/v1/job-category/list',
  },

  /* portfolio */
  PORTFOLIO: {
    LIST: '/v1/portfolio/list',
    LIKELIST: '/v1/portfolio/like/list',
    DETAIL: (username: string) => `/v1/portfolio/${username}`,
    METADATA: (username: string) => `/v1/portfolio/metadata/${username}`,
    LIKE: (username: string) => `/v1/portfolio/like/${username}`,
    UNLIKE: (username: string) => `/v1/portfolio/unlike/${username}`,
  },

  /* user */
  USER: {
    MY: '/v1/user/my',
    ACCOUNT: '/v1/user/account',
    JOBCATEGORY: '/v1/user/job-category',
  },

  /* image upload */
  IMAGEUPLOAD: (type: string) => `/v1/image/upload/${type}`,
}

export default API_ENDPOINTS
