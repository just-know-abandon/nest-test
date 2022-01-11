import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { StudentDB } from './entity/student.entity';

export interface StudentRo {
  list: StudentDB[];
  count: number;
}
@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentDB)
    private readonly studentRepository: Repository<StudentDB>,
  ) {}

  // 创建学生信息
  async create(post: Partial<StudentDB>): Promise<StudentDB> {
    const { COLLEGE_ID, CLASS_ID, ID_CARD_NO } = post;
    if (!COLLEGE_ID) {
      throw new HttpException('缺少所在学院ID', 401);
    }
    if (!CLASS_ID) {
      throw new HttpException('缺少所在班级ID', 401);
    }
    if (!ID_CARD_NO) {
      throw new HttpException('缺少身份证号', 401);
    }
    const doc = await this.studentRepository.findOne({ where: { ID_CARD_NO } });
    if (doc) {
      throw new HttpException('学生已存在', 401);
    }
    return await this.studentRepository.save(post);
  }
  
  // 获取学生列表
  async findAll(query): Promise<StudentRo> {
    const qb = await getRepository(StudentDB).createQueryBuilder('student');
    qb.where('1 = 1');
    qb.orderBy('student.CREATED_TIME', 'DESC');

    const count = await qb.getCount();
    const { pageNum = 1, pageSize = 10, ...params } = query;
    qb.limit(pageSize);
    qb.offset(pageSize * (pageNum - 1));

    const posts = await qb.getMany();
    return { list: posts, count: count };
  }

  // 获取指定学生信息
  async findById(post): Promise<StudentDB> {
    const { STUDENT_ID } = post
    const existPost = await this.studentRepository.findOne(STUDENT_ID);
    if (!existPost) {
      throw new HttpException(`STUDENT_ID为${STUDENT_ID}的学生不存在`, 401);
    }
    return existPost;
  }

  // 更新学生信息
  async updateById(post): Promise<StudentDB> {
    const { STUDENT_ID, COLLEGE_ID, CLASS_ID, STUDENT_NAME, MOBILE_PHONE, ID_CARD_NO, GENDER, BIRTH, ENTRY_DATE, UPDATED_BY } = post
    const existPost = await this.studentRepository.findOne({
      where : { STUDENT_ID }
    });
    if (!existPost) {
      throw new HttpException(`STUDENT_ID为${STUDENT_ID}的学生不存在`, 401);
    }
    existPost.COLLEGE_ID = COLLEGE_ID
    existPost.CLASS_ID = CLASS_ID
    existPost.STUDENT_NAME = STUDENT_NAME
    existPost.MOBILE_PHONE = MOBILE_PHONE
    existPost.ID_CARD_NO = ID_CARD_NO
    existPost.GENDER = GENDER
    existPost.BIRTH = BIRTH
    existPost.ENTRY_DATE = ENTRY_DATE
    existPost.UPDATED_BY = UPDATED_BY
    const result = this.studentRepository.save(existPost);
    return result
  }

  // 刪除学生信息
  async remove(post): Promise<StudentDB> {
    const {STUDENT_ID} = post
    const existPost = await this.studentRepository.findOne({
      where : {STUDENT_ID: STUDENT_ID}
    });
    if (!existPost) {
      throw new HttpException(`STUDENT_ID为${STUDENT_ID}的学生不存在`, 401);
    }
    return await this.studentRepository.remove(existPost);
  }
}