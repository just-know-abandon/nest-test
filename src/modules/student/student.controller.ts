import { StudentService, StudentRo } from './student.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { StudentDto } from './dto/student.dto'

@ApiTags("学生表")
@Controller('student')
export class StudentController {
  constructor(private readonly StudentService:StudentService){}

  /**
   * 创建学生信息
   * @param post
   */
  @ApiOperation({ summary: '创建学生信息',description: '备注111' })
  @Post('addStudentInfo')
  async create(@Body() post){
      return await this.StudentService.create(post)
  }

  /**
   * 获取学生列表
   */
  @ApiOperation({ summary: '获取学生列表' })
  @Get()
  async findAll(@Query() query):Promise<StudentRo>{
      return await this.StudentService.findAll(query)
  }

  /**
   * 获取指定学生信息
   * @param post 
   */
  @ApiOperation({ summary: '获取指定学生信息' })
  @Post('getStudentInfoById')
  async findById(@Body() post) {
      return await this.StudentService.findById(post)
  }

  /**
   * 更新学生信息
   * @param post 
   */
  @ApiOperation({ summary: '更新学生信息' })
  @Post('updateInfo')
  async updateById(@Body() post: StudentDto){
      return await this.StudentService.updateById(post)
  }

  /**
   * 删除
   * @param post 
   */
  @ApiOperation({ summary: '删除学生信息' })
  @Post("deleteByStudentId")
  async remove(@Body() post){
      return await this.StudentService.remove(post)
  }
}