import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { Env } from './env'
import { AllExceptionsFilter } from './interceptors/all-exceptions.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get<ConfigService<Env, true>>(ConfigService)

  const port = configService.get('PORT', { infer: true })

  app.useGlobalFilters(new AllExceptionsFilter())

  await app.listen(port)
}
bootstrap()
