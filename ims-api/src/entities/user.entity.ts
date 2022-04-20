import { Department } from "./department.entity";
import { Room } from "./room.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  Generated,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  BeforeInsert,
} from "typeorm";
import UserStatus from "../enums/user.enum";
import * as bcrypt from "bcrypt";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Generated("uuid")
  userId: string;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  phone: number;

  @Column()
  @Generated("uuid")
  confirmationCode: string;

  @Column({ default: UserStatus.PENDING })
  confirmed: number;

  @UpdateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Room, (room) => room.user)
  room: Room;

  @ManyToOne(() => Department, (department) => department.user)
  department: Department;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }

}
