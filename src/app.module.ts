import { AccountModule } from './modules/account/account.module'
import { UserModule } from './shared/user/user.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './prisma/prisma.service'
import { envSchema } from './env'
import { AuthModule } from './modules/auth/auth.module'
// import { AuthController } from './auth/auth.controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    AccountModule,
    UserModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
