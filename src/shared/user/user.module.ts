import { Module } from '@nestjs/common'
import { UserRepository } from './user.repository'
import { PrismaService } from '../../prisma/prisma.service'

@Module({
  imports: [],
  controllers: [],
  providers: [UserRepository, PrismaService],
  exports: [UserRepository],
})
export class UserModule {}
