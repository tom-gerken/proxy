import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { createProxyMiddleware } from 'http-proxy-middleware';


import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  // Configuration
  const port = process.env.PORT || 3333;
  const host = "localhost";
  const api_service_url = "https://api.crexi.com";
  const globalPrefix = '/api';
  
  app.setGlobalPrefix(globalPrefix);


  // Proxy endpoints
  app.use(globalPrefix, createProxyMiddleware({
    target: api_service_url,
    changeOrigin: true,
    pathRewrite: {
        [globalPrefix]: '',
    }
  }));

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
