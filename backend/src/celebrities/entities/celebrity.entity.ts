import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('celebrities')
export class Celebrity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // ✅ Add the userId column
  @Column()
  userId: string;

  @Column({ nullable: true })
  stageName?: string;

  @Column({ nullable: true })
  category?: string;

  @Column({ nullable: true })
  genre?: string;

  @Column('text', { nullable: true })
  bio?: string;

  @Column('simple-array', { nullable: true })
  industries?: string[];

  @Column('simple-array', { nullable: true })
  achievements?: string[];

  @Column({ nullable: true })
  fanbase?: number;

  @Column({ nullable: true })
  country?: string;

  @Column('json', { nullable: true })
  socialMedia?: {
    instagram?: string;
    youtube?: string;
    spotify?: string;
    twitter?: string;
  };

  @Column({ default: true })
  isVerified: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // ✅ Fix the relationship
  @OneToOne(() => User, user => user.celebrityProfile)
  @JoinColumn({ name: 'userId' })
  user: User;
}