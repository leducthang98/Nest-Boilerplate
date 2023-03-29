import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'user',
})
export class UserEntity {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;
}
