import { Column } from 'typeorm';

export class BaseEntity {
  @Column()
  createdAt?: string;

  @Column()
  updatedAt?: string;
}
