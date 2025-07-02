import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModuleNoDb } from './app-no-db.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModuleNoDb);
  
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
  
  await app.listen(3001);
  console.log('🚀 CelebNetwork Backend (No DB) is running on: http://localhost:3001');
  console.log('📋 Health check: http://localhost:3001/api/health');
  console.log('📋 API status: http://localhost:3001/api');
}
bootstrap();
