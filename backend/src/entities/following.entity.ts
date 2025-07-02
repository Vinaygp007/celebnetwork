import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { Fan } from './fan.entity';
import { Celebrity } from './celebrity.entity';

@Entity('followings')
export class Following {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Fan, fan => fan.followings)
  @JoinColumn()
  fan: Fan;

  @ManyToOne(() => Celebrity, celebrity => celebrity.followers)
  @JoinColumn()
  celebrity: Celebrity;

  @CreateDateColumn()
  createdAt: Date;
}
