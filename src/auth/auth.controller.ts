import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { PrismaService } from '../prisma/prisma.service'
import { AuthService } from './auth.service'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('/sessions')
export class AuthController {
  constructor(
    private jwt: JwtService,
    private prismaService: PrismaService,
    private authService: AuthService,
  ) {}

  // @Post('/ddd')
  // @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  // async handle(@Body() body: AuthenticateBodySchema) {
  //   const { email, password } = body

  //   const user = await this.prismaService.user.findUnique({
  //     where: { email },
  //   })

  //   if (!user) {
  //     throw new UnauthorizedException('User credentials do not match.')
  //   }

  //   const isPasswordValid = await compare(password, user.password)

  //   if (!isPasswordValid) {
  //     throw new UnauthorizedException('User credentials do not match.')
  //   }

  //   const accessToken = this.jwt.sign({ sub: user.id })

  //   return {
  //     access_token: accessToken,
  //   }
  // }

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async authenticate(@Body() body: AuthenticateBodySchema) {
    console.log('body', body)
    return this.authService.validateUser(body)
  }
}
