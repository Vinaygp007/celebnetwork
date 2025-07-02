import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CelebritiesModule } from './celebrities/celebrities.module';
import { FansModule } from './fans/fans.module';
import { AppController } from './app.controller';
import { User } from './entities/user.entity';
import { Celebrity } from './entities/celebrity.entity';
import { Fan } from './entities/fan.entity';
import { Following } from './entities/following.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'celebnetwork',
      entities: [User, Celebrity, Fan, Following],
      synchronize: process.env.NODE_ENV !== 'production', // Only for development
      retryAttempts: 3,
      retryDelay: 3000,
      maxQueryExecutionTime: 1000,
      logging: process.env.NODE_ENV === 'development',
    }),
    AuthModule,
    UsersModule,
    CelebritiesModule,
    FansModule,
  ],
  controllers: [AppController],
})
export class AppModule {
  async validateUser(email: string, password: string) {
    // 1. Input validation
    if (!email || !password) {
      throw new UnauthorizedException('Email and password are required');
    }

    // 2. User existence check
    const user = await this.userRepository.findOne({
      where: { email: email.toLowerCase().trim() },
      select: ['id', 'email', 'password', 'role', 'isActive'],
    });

    // 3. Account status check
    if (!user.isActive) {
      throw new UnauthorizedException('Account is deactivated');
    }

    // 4. Password hash existence check
    if (!user.password) {
      throw new UnauthorizedException('Invalid account configuration');
    }

    // 5. Secure password comparison
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }
  }
}
