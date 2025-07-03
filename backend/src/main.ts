import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  // Enable CORS
  app.enableCors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  
  // ✅ Add this line - your frontend expects /api prefix
  app.setGlobalPrefix('api');
  
  const port = process.env.PORT || 3001;
  await app.listen(port);
  
  console.log(`🚀 Backend server running on http://localhost:${port}`);
  console.log(`📊 Available routes:`);
  console.log(`   GET  http://localhost:${port}/api/health`);
  console.log(`   POST http://localhost:${port}/api/auth/login`);
  console.log(`   POST http://localhost:${port}/api/auth/register`);
  console.log(`   GET  http://localhost:${port}/api/users/profile`);
  console.log(`   GET  http://localhost:${port}/api/celebrities`);
}
bootstrap();
