import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller('/accounts')
export class CreateAccountController {
  constructor(private prismaService: PrismaService) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body() body: { name: string; email: string; password: string },
  ) {
    const { name, email, password } = body

    const emailUnique = await this.prismaService.user.findUnique({
      where: { email },
    })

    if (emailUnique) {
      throw new ConflictException('Email already exists')
    }

    await this.prismaService.user.create({
      data: {
        name,
        email,
        password,
      },
    })
  }
}
