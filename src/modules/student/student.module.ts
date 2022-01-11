import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentDB } from './entity/student.entity';

@Module({
  providers: [StudentService],
  controllers: [StudentController],
  imports: [TypeOrmModule.forFeature([StudentDB])],
})
export class StudentModule {}
