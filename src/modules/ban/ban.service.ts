import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { BanDB } from './entity/ban.entity';

export interface BanRo {
  list: BanDB[];
  count: number;
}
export interface BanRo2 {
  list: BanDB[];
}
@Injectable()
export class BanService {
  constructor(
    @InjectRepository(BanDB)
    private readonly banRepository: Repository<BanDB>,
  ) {}

  // 创建班级信息
  async create(post: Partial<BanDB>): Promise<BanDB> {
    const { COLLEGE_ID, CLASS_ID, MAJOR_ID } = post;
    if (!COLLEGE_ID) {
      throw new HttpException('缺少所在学院ID', 401);
    }
    // if (!CLASS_ID) {
    //   throw new HttpException('缺少所在班级ID', 401);
    // }
    if (!MAJOR_ID) {
      throw new HttpException('缺少所属专业ID', 401);
    }
    const doc = await this.banRepository.findOne({ where: { CLASS_ID } });
    if (doc) {
      throw new HttpException('班级已存在', 401);
    }
    return await this.banRepository.save(post);
  }
  
  // 获取班级列表
  async findAll(query): Promise<BanRo> {
    const qb = await getRepository(BanDB).createQueryBuilder('ban');
    qb.leftJoinAndSelect("ban.student", "student")
    qb.where('1 = 1');
    // qb.where('student.STUDENT_ID = 2');
    qb.orderBy('ban.CREATED_TIME', 'DESC');

    const count = await qb.getCount();
    const { pageNum = 1, pageSize = 10, ...params } = query;
    qb.limit(pageSize);
    qb.offset(pageSize * (pageNum - 1));

    const posts = await qb.getMany();
    return { list: posts, count: count };
  }

  // 获取指定班级信息
  async findById(post): Promise<BanRo2> {
    const { CLASS_ID } = post
    const existPost = await this.banRepository.findOne(CLASS_ID);
    if (!existPost) {
      throw new HttpException(`CLASS_ID为${CLASS_ID}的班级不存在`, 401);
    }
    const qb = await getRepository(BanDB).createQueryBuilder('ban');
    qb.leftJoinAndSelect("ban.student", "student")
    qb.where('1 = 1');
    qb.where(`ban.CLASS_ID = ${CLASS_ID}`);

    const posts = await qb.getMany();
    return { list: posts };
  }

  // 更新班级信息
  async updateById(post): Promise<BanDB> {
    const { CLASS_ID, COLLEGE_ID, MAJOR_ID, CLASS_NAME, STUDENT_NUMBER, ADVISER, UPDATED_BY } = post
    const existPost = await this.banRepository.findOne({
      where : { CLASS_ID }
    });
    if (!existPost) {
      throw new HttpException(`CLASS_ID为${CLASS_ID}的班级不存在`, 401);
    }
    existPost.COLLEGE_ID = COLLEGE_ID
    // existPost.CLASS_ID = CLASS_ID
    existPost.MAJOR_ID = MAJOR_ID
    existPost.CLASS_NAME = CLASS_NAME
    existPost.STUDENT_NUMBER = STUDENT_NUMBER
    existPost.ADVISER = ADVISER
    existPost.UPDATED_BY = UPDATED_BY
    const result = this.banRepository.save(existPost);
    return result
  }

  // 刪除学生信息
  async remove(post): Promise<BanDB> {
    const {CLASS_ID} = post
    const existPost = await this.banRepository.findOne({
      where : { CLASS_ID }
    });
    if (!existPost) {
      throw new HttpException(`CLASS_ID为${CLASS_ID}的班级不存在`, 401);
    }
    return await this.banRepository.remove(existPost);
  }
}
