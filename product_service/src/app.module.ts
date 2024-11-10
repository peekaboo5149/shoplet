import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ApiModule } from './api/api.module'
import { PrometheusModule } from '@willsoto/nestjs-prometheus'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { LoggingInterceptor } from './logging.interceptor'
import { DatabaseModule } from './config/database/database.module'
import { CatchEverythingFilter } from './config/exception/catch_everything.exception.filter'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrometheusModule.register(),
    DatabaseModule,
    ApiModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: CatchEverythingFilter,
    },
  ],
})
export class AppModule {}
