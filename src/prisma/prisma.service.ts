import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { envSchema } from '../env'

const env = envSchema.parse(process.env)

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'],
    })

    if (env.DEV === 'true') {
      this.$use(async (params, next) => {
        const before = Date.now()
        try {
          const result = await next(params)
          const after = Date.now()

          console.debug(`[DEBUG] Query: ${params.model}.${params.action}`)
          console.debug(`[DEBUG] Parameters:`, params.args)
          console.debug(`[DEBUG] Execution time: ${after - before}ms`)
          return result
        } catch (error) {
          console.error(
            `[ERROR] Query failed: ${params.model}.${params.action}`,
          )
          console.error(`[ERROR] Parameters:`, params.args)
          console.error(`[ERROR] Error:`, error)
          throw error
        }
      })
    }
  }

  async onModuleInit() {
    console.info('[INFO] Connecting to the database...')
    await this.$connect()
    console.info('[INFO] Successfully connected to the database.')
  }

  async onModuleDestroy() {
    console.info('[INFO] Disconnecting from the database...')
    await this.$disconnect()
    console.info('[INFO] Successfully disconnected from the database.')
  }
}
