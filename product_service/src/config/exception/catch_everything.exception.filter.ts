import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import { Request, Response } from 'express'

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
  private readonly logger: Logger = new Logger(CatchEverythingFilter.name, {
    timestamp: true,
  })
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    this.logger.error(exception)
    if (exception instanceof HttpException) {
      const ctx = host.switchToHttp()
      const response = ctx.getResponse<Response>()
      const request = ctx.getRequest<Request>()
      const status = exception.getStatus()

      response.status(status).json({
        error: exception.message,
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      })
    } else {
      // In certain situations `httpAdapter` might not be available in the
      // constructor method, thus we should resolve it here.
      const { httpAdapter } = this.httpAdapterHost
      const ctx = host.switchToHttp()
      const httpStatus =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR

      const responseBody = {
        statusCode: httpStatus,
        timestamp: new Date().toISOString(),
        path: httpAdapter.getRequestUrl(ctx.getRequest()),
      }

      httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus)
    }
  }
}
