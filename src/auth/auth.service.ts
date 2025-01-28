import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserRepository } from '../shared/user/user.repository'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcryptjs'
import { AuthenticateBodySchema } from './schemas/auth.schema'
import { AuthResponse } from './auth.types'

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginUser: AuthenticateBodySchema): Promise<AuthResponse> {
    const { email, password } = loginUser

    const user = await this.userRepository.findUniqueByEmail(email)

    if (!user) {
      throw new UnauthorizedException('User credentials do not match.')
    }

    const isPasswordValid = await compare(password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException('User credentials do not match.')
    }

    const accessToken = this.jwtService.sign({ sub: user.id })

    return {
      access_token: accessToken,
    }
  }
}
