import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fan } from '../entities/fan.entity';
import { Following } from '../entities/following.entity';
import { Celebrity } from '../entities/celebrity.entity';
import { FansService } from './fans.service';
import { FansController } from './fans.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Fan, Following, Celebrity])],
  providers: [FansService],
  controllers: [FansController],
  exports: [FansService],
})
export class FansModule {}
