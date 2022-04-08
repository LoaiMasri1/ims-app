import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne } from "typeorm";
import { Department } from "./department.entity";
import { Room } from "./room.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  age: number;

  @Column()
  phone: number;

  @Column({unique : true})
  email: string;

  // @Column({ default: true })
  // isActive: boolean;

  @OneToOne(() => Room, room => room.user )
  room:Room;

  @ManyToOne(() => Department, department => department.user)
  department:Department;
}
