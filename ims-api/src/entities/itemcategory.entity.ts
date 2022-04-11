import {Entity,JoinColumn, Column, ManyToOne, PrimaryColumn} from 'typeorm';
import { Item } from "./item.entity";
import {Category} from "./category.entity"

@Entity()
export class ItemCategory {

    @PrimaryColumn()
    itemId: number;

    @PrimaryColumn()
    categoryId: number;

    @Column()
    numberOfItem: number;

    @ManyToOne(() => Item, item => item.itemCategory)
    item: Item;

    @ManyToOne(() => Category, category => category.itemCategory)
    category: Category;


}