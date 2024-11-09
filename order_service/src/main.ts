import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const logger = new Logger('BootStrap', { timestamp: true })
  const app = await NestFactory.create(AppModule)
  const config = app.get<ConfigService>(ConfigService)
  const port = config.getOrThrow<string>('SERVER_PORT')
  await app.listen(port, () =>
    logger.log(`Order Service server running on port :${port}`),
  )
}
bootstrap()
