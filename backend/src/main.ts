import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend integration
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3003', 'https://celebnetwork.com'],
    credentials: true,
  });
  
  // Enable global validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  // Global prefix for all routes
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 CelebNetwork Backend is running on: http://localhost:${port}`);
  console.log(`📚 API endpoints available at: http://localhost:${port}/api`);
}
bootstrap();
