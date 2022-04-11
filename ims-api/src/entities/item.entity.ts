import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import { Category } from "./category.entity";
import { ItemCategory } from "./itemcategory.entity";


@Entity()
export class Item{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToOne(()=> Category, Category=>Category.item)
    category:Category

    @OneToMany(()=> ItemCategory, itemCategory => itemCategory.item)
    itemCategory: ItemCategory[]
}