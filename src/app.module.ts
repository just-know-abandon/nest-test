// 	应用程序的根模块(Module)
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CollegeModule } from './modules/college/college.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { MajorModule } from './modules/major/major.module';
import { StudentModule } from './modules/student/student.module';
import { BanModule } from './modules/ban/ban.module';

@Module({
  imports: [
    // 使用 TypeORM 配置数据库
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'nesttest',
      entities: ["dist/modules/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    CollegeModule,
    MajorModule,
    StudentModule,
    BanModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// providers：Nest.js注入器实例化的提供者（服务提供者），处理具体的业务逻辑，各个模块之间可以共享（注入器的概念后面依赖注入部分会讲解）；
// controllers：处理http请求，包括路由控制，向客户端返回响应，将具体业务逻辑委托给providers处理；
// imports：导入模块的列表，如果需要使用其他模块的服务，需要通过这里导入；
// exports：导出服务的列表，供其他模块导入使用。如果希望当前模块下的服务可以被其他模块共享，需要在这里配置导出；
