import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @CreateDateColumn()
  createdAt?: string;

  @UpdateDateColumn()
  updatedAt?: string;
}
