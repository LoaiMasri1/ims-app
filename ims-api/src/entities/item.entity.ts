import { ItemRoom } from "./itemroom.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { Category } from "./category.entity";

@Entity()
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Category, (Category) => Category.item)
  category: Category;

  @OneToMany(() => ItemRoom, (itemRoom) => itemRoom.item)
  itemRoom: ItemRoom[];
}
