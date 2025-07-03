import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt'; // ✅ Add this import
import { FansService } from './fans.service';
import { FansController } from './fans.controller';
import { Fan } from './entities/fan.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Fan]),
    JwtModule.register({ // ✅ Add this
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [FansController],
  providers: [FansService],
  exports: [FansService, TypeOrmModule],
})
export class FansModule {}