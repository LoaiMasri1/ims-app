import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { Item } from "./item.entity";

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mainClassification: string;

  @Column()
  subClassification: string;

  @OneToMany(() => Item, (item) => item.category)
  item: Item[];
}
