import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const logger = new Logger('BootStrap', { timestamp: true })
  const app = await NestFactory.create(AppModule)
  const config = app.get<ConfigService>(ConfigService)
  const port = config.getOrThrow<string>('SERVER_PORT')

  app.setGlobalPrefix('api/v1')
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(port, () =>
    logger.log(`Order Service server running on port :${port}`),
  )
}
bootstrap()
