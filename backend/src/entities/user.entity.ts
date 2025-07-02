import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { UserRole } from '../enums/user-role.enum';
import { Celebrity } from './celebrity.entity';
import { Fan } from './fan.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.FAN,
  })
  role: UserRole;

  @Column({ default: true })
  isActive: boolean;

  // Relationships
  @OneToOne(() => Celebrity, celebrity => celebrity.user)
  celebrity: Celebrity;

  @OneToOne(() => Fan, fan => fan.user)
  fan: Fan;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
