// main.ts
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filter/http-exception.filter';
import { TransformInterceptor } from './core/interceptor/transform.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 设置swagger文档
  const config = new DocumentBuilder()
    .setTitle('nest-test')   
    .setDescription('nest接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.setGlobalPrefix('api'); // 设置全局路由前缀
  // app.useGlobalFilters(new HttpExceptionFilter()); // 全局注册错误的过滤器
  app.useGlobalInterceptors(new TransformInterceptor()); // 全局注册成功拦截器
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();


// nest g mo xxx/xxx # 创建模块
// nest g s xxx/xxx  # 创建服务
// nest g co xxx/xxx # 创建控制器