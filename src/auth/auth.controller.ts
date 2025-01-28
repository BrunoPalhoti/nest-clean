import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { AuthService } from './auth.service'
import {
  authenticateBodySchema,
  AuthenticateBodySchema,
} from './schemas/auth.schema'
import { AuthResponse } from './auth.types'

@Controller('/sessions')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async authenticate(
    @Body() body: AuthenticateBodySchema,
  ): Promise<AuthResponse> {
    return this.authService.validateUser(body)
  }
}
