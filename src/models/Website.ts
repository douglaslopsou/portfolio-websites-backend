import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Segment from './Segment';

@Entity('websites')
class Website {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  customer: string;

  @Column()
  plan: string;

  @Column()
  segment_id: string;

  @ManyToOne(() => Segment)
  @JoinColumn({ name: 'segment_id' })
  segment: Segment;

  @Column('')
  website_address: string;

  @Column()
  thumbnail: string;

  @Column()
  amount_paid: string;

  @Column()
  salesman: string;

  @Column('timestamp')
  publish_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Website;
