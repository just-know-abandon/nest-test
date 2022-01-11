import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";

// @PrimaryGeneratedColumn       自增主键
// @Column({ length: 30})        长度限制为30的string列，对应数据库里就是varchar类型
// @Column("text")               长度不限，对应数据库里就是text类型
// @Column()                     什么都不设置的时候需要注意！！会默认设置NOT NULL！插入时一定要设定这一字段的值
// @Column({default:"默认值"})   如果设置了默认值，那么当插入的时候可以不设定这一值
// @Column("double")            对应数据库里double类型
// @CreateDateColumn()          这个列会在插入的时候自动以当前时间赋值，更新时不改变值
// @UpdateDateColumn()          这个列会在插入和更新的时候以当前时间赋值


@Entity("student")
export class StudentDB {
  // 专业ID
  @PrimaryGeneratedColumn()
  MAJOR_ID:number;
  // 专业名称
  @Column({ length: 90})
  MAJOR_NAME: string;
  // 专业简称
  @Column({ length: 90})
  SHORT_NAME: string;
  // 开设日期
  @CreateDateColumn()
  ESTAB_DATE: Date
  // 专业介绍
  @Column({ length: 900})
  INTRO: string;
  // 学费
  @Column('text')
  TUITION_FEE: string;
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

