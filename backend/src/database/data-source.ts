import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../entities/user.entity';
import { Celebrity } from '../entities/celebrity.entity';
import { Fan } from '../entities/fan.entity';
import { Following } from '../entities/following.entity';

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST', 'localhost'),
  port: configService.get('DB_PORT', 5432),
  username: configService.get('DB_USERNAME', 'postgres'),
  password: configService.get('DB_PASSWORD', 'password'),
  database: configService.get('DB_NAME', 'celebnetwork'),
  entities: [User, Celebrity, Fan, Following],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: configService.get('NODE_ENV') !== 'production',
  logging: configService.get('NODE_ENV') === 'development',
});
