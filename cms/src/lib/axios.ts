import type { ApiResponse } from '@/types/api.types'
import axios, { type AxiosResponse, type InternalAxiosRequestConfig, type AxiosError } from 'axios'

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = 'application/json'
  }

  config.withCredentials = true
  return config
}

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
})

axiosInstance.interceptors.request.use(authRequestInterceptor)
axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token')
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axiosInstance.interceptors.response.use(
  <T>(response: AxiosResponse<ApiResponse<T>>) => {
    if (!response.data.success) {
      return Promise.reject({
        message: response.data.message,
        statusCode: response.data.statusCode,
      })
    }

    return response.data as T
  },
  (error: AxiosError<ApiResponse<unknown>>) => {
    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response
      // data may be undefined or not ApiResponse, so use optional chaining
      console.error(`API Error ${status}:`, data)

      // You can handle specific error codes here
      if (status === 401) {
        // Unauthorized - redirect to login
        localStorage.removeItem('token')
        window.location.href = '/login'
      }

      return Promise.reject({
        status,
        message: (data as ApiResponse<unknown>)?.message || 'An error occurred',
        data: (data as ApiResponse<unknown>)?.data || null,
      })
    } else if (error.request) {
      // Network error
      console.error('Network Error:', error.request)
      return Promise.reject({
        status: 0,
        message: 'Network error. Please check your connection.',
        data: null,
      })
    } else {
      // Other errors
      console.error('Error:', error.message)
      return Promise.reject({
        status: 0,
        message: error.message || 'An unexpected error occurred',
        data: null,
      })
    }
  }
)
