import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne, JoinColumn} from "typeorm";
import { StudentDB } from '../../student/entity/student.entity'

// @PrimaryGeneratedColumn       自增主键
// @Column({ length: 30})        长度限制为30的string列，对应数据库里就是varchar类型
// @Column("text")               长度不限，对应数据库里就是text类型
// @Column()                     什么都不设置的时候需要注意！！会默认设置NOT NULL！插入时一定要设定这一字段的值
// @Column({default:"默认值"})   如果设置了默认值，那么当插入的时候可以不设定这一值
// @Column("double")            对应数据库里double类型
// @CreateDateColumn()          这个列会在插入的时候自动以当前时间赋值，更新时不改变值
// @UpdateDateColumn()          这个列会在插入和更新的时候以当前时间赋值

// 可选参数
// name: 真正映射到mysql数据库中字段名字,如果不指定会默认以对象的字段为名字(建议都指定)
// length: 长度,比如在mysql中字段为varchar的时候指定字段长度
// nullable: 在mysql中字段是否可以为NULL值,默认为false
// select: 改字段是否可以被查询出来(针对使用typeORM的查寻操作,不针对你使用原生SQL语句操作),默认为true表示可以被查询出来
// default: 默认值,比如插入数据的时候,没传递该字段的值,就默认一个值
// unique: 是否唯一约束
// comment: 备注该字段是做什么的(建议都写上,方便阅读)
// enum: 枚举类型
// array: 该列是否以数组


@Entity("ban")
export class BanDB {
  // 班级ID
  @PrimaryGeneratedColumn()
  CLASS_ID:number;
  // 所在学院
  @Column({ length: 32})
  COLLEGE_ID: string;
  // 所属专业ID
  @Column({ length: 32})
  MAJOR_ID: string;
  
  // 班级名称
  @Column({ length: 90})
  CLASS_NAME: string;
  // 班级人数
  @Column('int')
  STUDENT_NUMBER: number;
  // 辅导员
  @Column({ length: 90})
  ADVISER: string;
  // 成立时间
  @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  ESTAB_DATE: Date
  // 创建人
  @Column({ length: 32, nullable: true})
  CREATED_BY: string;
  // 创建时间
  @CreateDateColumn()
  CREATED_TIME: Date
  // 更新人
  @Column({ length: 32, nullable: true})
  UPDATED_BY: string;
  
  //更新时间
  @UpdateDateColumn()
  UPDATED_TIME: Date

  @OneToMany(() => StudentDB, (student) => student.ban)
  student: StudentDB[];
}


