import { Controller, Post, Body, UsePipes, UseGuards } from '@nestjs/common'
import { ZodValidationPipe } from '../../../pipes/zod-validation-pipe'
import { CreateAccountService } from './create-account.service'
import {
  CreateUserSchema,
  createUserSchema,
} from './schemas/create-account.schema'
import { SuccessResponseException } from '../../../exceptions/success-response.exception'
import { AuthGuard } from '@nestjs/passport'

@Controller('/accounts')
@UseGuards(AuthGuard('jwt'))
export class CreateAccountController {
  constructor(private createAccountService: CreateAccountService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async createAccount(@Body() body: CreateUserSchema) {
    await this.createAccountService.createAccount(body)

    throw new SuccessResponseException({
      message: 'Account created successfully',
    })
  }
}
