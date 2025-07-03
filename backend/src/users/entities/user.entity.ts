import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { Celebrity } from '../../celebrities/entities/celebrity.entity';
import { Fan } from '../../fans/entities/fan.entity';

export enum UserRole {
  FAN = 'fan',
  CELEBRITY = 'celebrity',
  ADMIN = 'admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.FAN,
  })
  role: UserRole;

  // ✅ Add profile fields
  @Column({ nullable: true })
  phone?: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth?: string;

  @Column({ nullable: true })
  location?: string;

  @Column({ type: 'text', nullable: true })
  bio?: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: true })
  coverPhoto?: string;

  // ✅ Store interests as JSON array
  @Column({ type: 'json', nullable: true })
  interests?: string[];

  // ✅ Store social media as JSON object
  @Column({ type: 'json', nullable: true })
  socialMedia?: {
    instagram?: string;
    twitter?: string;
    tiktok?: string;
    youtube?: string;
  };

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // ✅ Add relationship properties
  @OneToOne(() => Celebrity, celebrity => celebrity.user)
  celebrityProfile?: Celebrity;

  @OneToOne(() => Fan, fan => fan.user)
  fanProfile?: Fan;
}