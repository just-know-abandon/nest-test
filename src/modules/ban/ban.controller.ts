import { BanService, BanRo } from './ban.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags("班级表")
@Controller('ban')
export class BanController {
  constructor(private readonly BanService:BanService){}

  /**
   * 创建学生信息
   * @param post
   */
  @ApiOperation({ summary: '创建班级信息',description: '备注222' })
  @Post('addBanInfo')
  async create(@Body() post){
      return await this.BanService.create(post)
  }

  /**
   * 获取学生列表
   */
  @ApiOperation({ summary: '获取班级列表' })
  @Get()
  async findAll(@Query() query):Promise<BanRo>{
      return await this.BanService.findAll(query)
  }

  /**
   * 获取指定班级信息
   * @param post 
   */
  @ApiOperation({ summary: '获取指定班级信息' })
  @Post('getBanInfoById')
  async findById(@Body() post) {
      return await this.BanService.findById(post)
  }

  /**
   * 更新学生信息
   * @param post 
   */
  @ApiOperation({ summary: '更新班级信息' })
  @Post('updateInfo')
  async updateById(@Body() post){
      return await this.BanService.updateById(post)
  }

  /**
   * 删除
   * @param post 
   */
  @ApiOperation({ summary: '删除班级信息' })
  @Post("deleteByClassId")
  async remove(@Body() post){
      return await this.BanService.remove(post)
  }
}
