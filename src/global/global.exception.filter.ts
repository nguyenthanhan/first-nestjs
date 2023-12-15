import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  ConflictException,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.log(
      '🚀 ~ file: global.exception.filter.ts:13 ~ AllExceptionsFilter ~ exception:',
      exception,
    );
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const customResponse =
      exception instanceof HttpException ? exception.getResponse() : {};

    response.status(status).json({
      statusCode: status,
      data: null,
      timestamp: new Date().toISOString(),
      ...(customResponse instanceof Object
        ? customResponse
        : { message: customResponse }),
    });
  }
}
