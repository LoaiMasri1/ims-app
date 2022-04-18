import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import { Room } from "./room.entity";
import { User } from "./user.entity";

@Entity()
export class Department extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  floorNumber: number;

  @OneToMany(() => User, user => user.department )
  user:User[];

  @OneToMany(() => Room, room => room.department )
  room:Room[];

}
