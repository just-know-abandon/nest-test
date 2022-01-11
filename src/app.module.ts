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
