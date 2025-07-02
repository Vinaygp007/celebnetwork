import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import { Context, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { createServer, proxy } from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';
import express from 'express';
import { AppModule } from './app.module';

let cachedServer: any;

async function bootstrap(): Promise<any> {
  if (!cachedServer) {
    const expressApp = express();
    
    const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
    
    // Enable CORS
    nestApp.enableCors({
      origin: ['http://localhost:3000', 'https://celebnetwork.com'],
      credentials: true,
    });
    
    // Enable global validation
    nestApp.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }));
    
    // Use middleware for AWS context
    nestApp.use(eventContext());
    
    // Global prefix for all routes
    nestApp.setGlobalPrefix('api');
    
    await nestApp.init();
    
    cachedServer = createServer(expressApp);
  }
  
  return cachedServer;
}

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  const server = await bootstrap();
  return proxy(server, event, context, 'PROMISE').promise;
};
