import { Response } from 'express'

interface ApiError extends Error {
  status?: number
  statusCode?: number
}

export const errorHandler = (err: ApiError, req: any, res: Response, next: any) => {
  console.error(err)

  const status = err.status || err.statusCode || 500
  const message = err.message || 'Internal server error'

  res.status(status).json({
    error: message,
    status,
  })
}

export class ApiErrorClass extends Error implements ApiError {
  status: number

  constructor(message: string, status: number = 500) {
    super(message)
    this.status = status
  }
}
