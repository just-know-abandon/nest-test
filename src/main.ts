// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // 设置全局路由前缀
  await app.listen(3000);
}
bootstrap();


// nest g mo xxx/xxx # 创建模块
// nest g s xxx/xxx  # 创建服务
// nest g co xxx/xxx # 创建控制器