 import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4200', // Frontend URL
    methods: 'GET,POST,PUT,DELETE',  // HTTP methods you want to allow
  });
  await app.listen(3000);
}
bootstrap();
