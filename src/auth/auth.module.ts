import { AuthService } from './auth.service'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { Env } from '../env'
import { JwtStrategy } from './jwt.strategy'
import { UserRepository } from '../user/user.repository'
import { PrismaService } from '../prisma/prisma.service'
import { AuthController } from './auth.controller'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory: (config: ConfigService<Env, true>) => {
        const privateKey = config.get('JWT_PRIVATE_KEY', { infer: true })
        const publicKey = config.get('JWT_PUBLIC_KEY', { infer: true })
        return {
          signOptions: { algorithm: 'RS256' },
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64'),
        }
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UserRepository, PrismaService],
  exports: [AuthService],
})
export class AuthModule {}
