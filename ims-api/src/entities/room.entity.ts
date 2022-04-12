import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, ManyToOne, BaseEntity } from "typeorm";
import { Department } from "./department.entity";
import { User } from "./user.entity";

@Entity()
export class Room extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @OneToOne(() => User, user => user.room )
  @JoinColumn()
  user:User;

  @ManyToOne(() => Department, department=>department.room)
  department:Department;

}
