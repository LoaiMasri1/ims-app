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
import { IsNotEmpty } from "class-validator";
import { Department } from "./department.entity";
import { User } from "./user.entity";

@Entity()
export class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  type: string;

  @OneToOne(() => User, (user) => user.room, {
    onDelete: "SET NULL",
  })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Department, (department) => department.room, {
    onDelete: "SET NULL",
  })
  department: Department;

  @OneToMany(() => ItemRoom, (itemRoom) => itemRoom.room)
  itemRoom: ItemRoom[];
}
