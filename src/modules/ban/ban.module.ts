import { Module } from '@nestjs/common';
import { BanService } from './ban.service';
import { BanController } from './ban.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BanDB } from './entity/ban.entity';

@Module({
  providers: [BanService],
  controllers: [BanController],
  imports: [TypeOrmModule.forFeature([BanDB])],
})
export class BanModule {}
