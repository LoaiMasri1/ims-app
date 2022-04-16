import { ItemRoom } from "./itemroom.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { Department } from "./department.entity";
import { User } from "./user.entity";

@Entity()
export class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @OneToOne(() => User, (user) => user.room)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Department, (department) => department.room)
  department: Department;

  @OneToMany(() => ItemRoom, (itemRoom) => itemRoom.room)
  itemRoom: ItemRoom[];
}
