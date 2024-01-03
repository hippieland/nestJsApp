import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cors());
  await app.listen(3000);
}
bootstrap();
