import { IsNotEmpty, IsNumber, IsString, IsNumberString } from 'class-validator';

export class StudentDto{
  @IsNotEmpty({ message: '学生ID必填' })
  readonly STUDENT_ID: number

  // @IsNumber()
  @IsNumberString()
  @IsNotEmpty({ message: '缺少所在学院ID' })
  readonly COLLEGE_ID: number

  // @IsNotEmpty({ message: '缺少所在班级ID' })
  // @IsString()
  readonly CLASS_ID: string
  readonly STUDENT_NAME: string
  readonly MOBILE_PHONE: string
  readonly ID_CARD_NO: string
  readonly GENDER: string
  readonly BIRTH: Date
  readonly ENTRY_DATE: Date
  readonly UPDATED_BY: string
}