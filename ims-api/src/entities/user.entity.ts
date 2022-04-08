import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  Generated,
  UpdateDateColumn,
} from "typeorm";
import UserStatus from "../enums/user.enum";

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
}
