import { Module } from '@nestjs/common'
import { CreateAccountController } from './create-account/create-account.controller'
import { PrismaService } from '../prisma/prisma.service'
import { CreateAccountService } from './create-account/create-account.service'
import { UserRepository } from '../shared/user/user.repository'

@Module({
  imports: [],
  controllers: [CreateAccountController],
  providers: [CreateAccountService, PrismaService, UserRepository],
})
export class AccountModule {}
