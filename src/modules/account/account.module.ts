import { Module } from '@nestjs/common'
import { CreateAccountController } from './create-account/create-account.controller'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateAccountService } from './create-account/create-account.service'
import { UserRepository } from '../../shared/user/user.repository'
import { ListAccountService } from './list-account/list-account.service'
import { ListAccountController } from './list-account/list-account.controller'

@Module({
  imports: [],
  controllers: [CreateAccountController, ListAccountController],
  providers: [
    CreateAccountService,
    ListAccountService,
    PrismaService,
    UserRepository,
  ],
})
export class AccountModule {}
