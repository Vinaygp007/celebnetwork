import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('fans')
export class Fan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // ✅ Add the userId column
  @Column()
  userId: string;

  @Column('simple-array', { nullable: true })
  interests?: string[];

  @Column('simple-array', { nullable: true })
  favoriteGenres?: string[];

  @Column('simple-array', { nullable: true })
  followedCelebrities?: string[];

  @Column('json', { nullable: true })
  preferences?: {
    notifications?: boolean;
    privacy?: string;
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // ✅ Fix the relationship
  @OneToOne(() => User, user => user.fanProfile)
  @JoinColumn({ name: 'userId' })
  user: User;
}