import { Room } from "./room.entity";
import { Item } from "./item.entity";
import { Entity, Column, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class ItemRoom {
  @PrimaryColumn()
  itemId: number;

  @PrimaryColumn()
  roomId: number;

  @Column()
  numberOfItem: number;

  @ManyToOne(() => Item, (item) => item.itemRoom)
  item: Item;

  @ManyToOne(() => Room, (room) => room.itemRoom)
  room: Room;
}
