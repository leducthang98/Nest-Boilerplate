import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({
    name: 'user'
})
export class UserEntity {
    @PrimaryColumn({ type: 'uuid' })
    id: string;

    @Column()
    username: string;

    @Column()
    password: string;
}