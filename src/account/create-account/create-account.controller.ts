import { Controller, Post, Body, UsePipes } from '@nestjs/common'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { CreateAccountService } from './create-account.service'
import {
  CreateUserSchema,
  createUserSchema,
} from './schemas/create-account.schema'

@Controller('/accounts')
export class CreateAccountController {
  constructor(private createAccountService: CreateAccountService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async createAccount(@Body() body: CreateUserSchema) {
    return this.createAccountService.createAccount(body)
  }
}
