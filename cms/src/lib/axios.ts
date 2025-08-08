import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from 'axios'

type ErrorResponseData = {
  message?: string
  data?: unknown
}

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8090/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000,
})

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (config.headers && !config.headers['Accept']) {
      config.headers['Accept'] = 'application/json'
    }
    if (config.headers && !config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json'
    }
    const token = localStorage.getItem('accessToken')
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    config.withCredentials = true
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError<ErrorResponseData>) => {
    if (error.response) {
      const { status, data } = error.response
      if (status === 401) {
        localStorage.removeItem('accessToken')
        window.location.href = '/login'
      }
      return Promise.reject({
        status,
        message: data?.message || 'An error occurred',
        data: data?.data ?? null,
      })
    }
    if (error.request) {
      return Promise.reject({
        status: 0,
        message: 'Network error. Please check your connection.',
        data: null,
      })
    }
    return Promise.reject({
      status: 0,
      message: error.message || 'An unexpected error occurred',
      data: null,
    })
  }
)

export { api }
