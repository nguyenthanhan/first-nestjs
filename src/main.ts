import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassValidationPipe } from './pipes/validation.pipe';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './global/global.exception.filter';
import { LoggingInterceptor } from './global/global.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(3000);
}
bootstrap();
