import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { Request, Response } from 'express'

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
      response.status(status).json({
        data: {
          statusCode: status,
          message: responseMessage.message || 'Internal server error',
          errors: responseMessage.errors || [],
          timestamp: new Date().toISOString(),
          path: request.url,
        },
      })
    }
  }
}
