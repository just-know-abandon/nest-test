// 单个路由的基本控制器(Controller)
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // 无用接口屏蔽
  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
