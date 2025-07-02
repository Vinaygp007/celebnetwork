import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Following } from './following.entity';

@Entity('celebrities')
export class Celebrity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  stageName: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  coverPhoto: string;

  @Column({ type: 'text', array: true, default: [] })
  industries: string[];

  @Column({ type: 'text', array: true, default: [] })
  socialMedia: string[];

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: 0 })
  followersCount: number;

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
  rating: number;

  @Column({ nullable: true })
  country: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'jsonb', nullable: true })
  socialHandles: {
    instagram?: string;
    twitter?: string;
    youtube?: string;
    spotify?: string;
    imdb?: string;
  };

  @Column({ type: 'int', default: 0 })
  profileViews: number;

  @Column({ type: 'jsonb', nullable: true })
  performanceStats: {
    totalPerformances?: number;
    upcomingEvents?: number;
    recentNews?: Record<string, unknown>[];
  };

  // Relationships
  @OneToMany(() => Following, following => following.celebrity)
  followers: Following[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
