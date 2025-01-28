import { ConflictException, Injectable } from '@nestjs/common'
import { UserRepository } from '../../../shared/user/user.repository'
import { hash } from 'bcryptjs'
import { CreateUserSchema } from './schemas/create-account.schema'

@Injectable()
export class CreateAccountService {
  constructor(private userRepository: UserRepository) {}

  async createAccount({ name, email, password }: CreateUserSchema) {
    const emailUnique = await this.userRepository.findUniqueByEmail(email)

    if (emailUnique) {
      throw new ConflictException('Email already exists')
    }

    const hashedPassword = await hash(password, 8)

    await this.userRepository.create({ name, email, password: hashedPassword })
  }
}
