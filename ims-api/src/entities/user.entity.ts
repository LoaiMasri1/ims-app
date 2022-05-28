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
import { UserStatus, UserRole } from "../enums/user.enum";
import * as bcrypt from "bcrypt";

import { IsNotEmpty, IsEmail, Matches, IsPhoneNumber } from "class-validator";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Generated("uuid")
  userId: string;

  @Column()
  @IsNotEmpty({
    message: "please enter username",
  })
  username: string;

  @Column({ unique: true })
  @IsNotEmpty({
    message: "please enter email",
  })
  @IsEmail()
  email: string;

  @Column()
  @IsNotEmpty({
    message: "please enter password",
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/, {
    message:
      "Password must contain uppercase and lowercase characters, minimum character length 8, maximum 20",
  })
  password: string;

  @Column({ unique: true })
  @IsPhoneNumber()
  @IsNotEmpty({
    message: "please enter phone number",
  })
  phone: string;

  @Column({ default: UserStatus.PENDING })
  confirmed: number;

  @Column({ default: UserRole.USER })
  role: number;

  @UpdateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Room, (room) => room.user)
  room: Room;

  @ManyToOne(() => Department, (department) => department.user, {
    onDelete: "SET NULL",
  })
  department: Department;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
