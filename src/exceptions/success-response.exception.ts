import { HttpException, HttpStatus } from '@nestjs/common'

export class SuccessResponseException<T> extends HttpException {
  constructor({ message, data }: { message?: string; data?: T }) {
    super(
      {
        status: 'success',
        message,
        ...(data && { data }),
      },
      HttpStatus.OK,
    )
  }
}
