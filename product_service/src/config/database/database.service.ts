import {
  Injectable,
  Logger,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class DatabaseService
  extends PrismaClient
  implements OnModuleInit, OnApplicationShutdown
{
  private readonly logger = new Logger(DatabaseService.name, {
    timestamp: true,
  })
  async onModuleInit() {
    await this.$connect()
    this.logger.log(`Connected to database`)
  }
  async onApplicationShutdown(signal?: string) {
    this.logger.log(`Disconnecting from database`)
    await this.$disconnect()
  }
}
