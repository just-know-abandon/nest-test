import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";

// @PrimaryGeneratedColumn       自增主键
// @Column({ length: 30})        长度限制为30的string列，对应数据库里就是varchar类型
// @Column("text")               长度不限，对应数据库里就是text类型
// @Column()                     什么都不设置的时候需要注意！！会默认设置NOT NULL！插入时一定要设定这一字段的值
// @Column({default:"默认值"})   如果设置了默认值，那么当插入的时候可以不设定这一值
// @Column("double")            对应数据库里double类型
// @CreateDateColumn()          这个列会在插入的时候自动以当前时间赋值，更新时不改变值
// @UpdateDateColumn()          这个列会在插入和更新的时候以当前时间赋值


@Entity("ban")
export class banDB {
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
  @Column({ length: 32})
  CREATED_BY: string;
  // 创建时间
  @CreateDateColumn()
  CREATED_TIME: Date
  // 更新人
  @Column({ length: 32})
  UPDATED_BY: string;
  
  //更新时间
  @UpdateDateColumn()
  UPDATED_TIME: Date
}


