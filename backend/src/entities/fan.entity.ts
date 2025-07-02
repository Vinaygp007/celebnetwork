import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Following } from './following.entity';

@Entity('fans')
export class Fan {
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
  dateOfBirth: Date;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ type: 'text', array: true, default: [] })
  interests: string[];

  @Column({ type: 'text', array: true, default: [] })
  favoriteCelebrities: string[];

  // Relationships
  @OneToMany(() => Following, following => following.fan)
  followings: Following[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
