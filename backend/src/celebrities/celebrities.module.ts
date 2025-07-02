import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Celebrity } from '../entities/celebrity.entity';
import { Fan } from '../entities/fan.entity';
import { Following } from '../entities/following.entity';
import { CelebrityService } from '../services/celebrity.service';
import { AiService } from '../services/ai.service';
import { PdfService } from '../services/pdf.service';
import { CelebrityController } from '../controllers/celebrity.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Celebrity, Fan, Following])],
  providers: [CelebrityService, AiService, PdfService],
  controllers: [CelebrityController],
  exports: [CelebrityService, AiService, PdfService],
})
export class CelebritiesModule {}
