import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { envSchema } from '../env'

const env = envSchema.parse(process.env)
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    const message: any =
      exception instanceof HttpException
        ? exception.getResponse()
        : { message: 'Internal server error' }

    const responseMessage = typeof message === 'string' ? { message } : message

    if (status === HttpStatus.OK) {
      response.status(status).json({
        data: responseMessage.data,
        message: responseMessage.message || 'Success',
      })
    } else {
      console.log('AQUI')
      const errorResponse: any = {
        statusCode: status,
        message: responseMessage.message || 'Internal server error',
        errors: responseMessage.errors || [],
        timestamp: new Date().toISOString(),
        path: request.url,
      }

      if (env.DEV === 'true' && exception instanceof Error) {
        errorResponse.stack = exception.stack
      }

      response.status(status).json({ data: errorResponse })
    }
  }
}
