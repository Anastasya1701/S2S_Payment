import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments/payments.module';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule);
  app.getHttpAdapter().get('/', (req, res) => {
    res.send({ message: 'API is running!' });
  });

  app.enableCors();

  const port = process.env.PORT || 4000; // Должно быть 4000
  await app.listen(port);
  console.log(`🚀 Backend is running on http://localhost:${port}`);
}

bootstrap();
