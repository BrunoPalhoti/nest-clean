import { Controller, Get } from '@nestjs/common'
import { ListAccountService } from './list-account.service'

@Controller('account')
export class ListAccountController {
  constructor(private listAccountService: ListAccountService) {}

  @Get('/getAllAccount')
  getAllAccount(): string {
    return this.listAccountService.getAllAccount()
  }
}
