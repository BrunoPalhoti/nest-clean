import { HttpException, HttpStatus } from '@nestjs/common'

export class SuccessResponseException extends HttpException {
  constructor(message: string) {
    super(
      {
        status: 'success',
        message,
      },
      HttpStatus.OK,
    )
  }
}
