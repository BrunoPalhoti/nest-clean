import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { AuthService } from './auth.service'
import {
  authenticateBodySchema,
  AuthenticateBodySchema,
} from './schemas/auth.schema'

@Controller('/sessions')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async authenticate(@Body() body: AuthenticateBodySchema) {
    console.log('body', body)
    return this.authService.validateUser(body)
  }
}
