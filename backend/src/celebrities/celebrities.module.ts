import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt'; // ✅ Add this import
import { CelebritiesService } from './celebrities.service';
import { CelebritiesController } from './celebrities.controller';
import { Celebrity } from './entities/celebrity.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Celebrity]),
    JwtModule.register({ // ✅ Add this
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [CelebritiesController],
  providers: [CelebritiesService],
  exports: [CelebritiesService, TypeOrmModule],
})
export class CelebritiesModule {}