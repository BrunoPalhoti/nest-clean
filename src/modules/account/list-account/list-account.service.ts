import { Injectable } from '@nestjs/common'

@Injectable()
export class ListAccountService {
  constructor() {}

  getAllAccount(): string {
    return 'getAllAccount'
  }
}
