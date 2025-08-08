import { Response } from 'express'

/**
 * Success response
 */
export function success(res: Response, data: any = null, message = 'Success', statusCode = 200) {
  return res.status(statusCode).json({
    statusCode,
    success: true,
    data,
    message,
  })
}

/**
 * Error response
 */
export function error(
  res: Response,
  message = 'Something went wrong',
  statusCode = 500,
  errorDetail: any = null
) {
  return res.status(statusCode).json({
    success: false,
    message,
    data: null,
    error: errorDetail,
  })
}
