import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Item } from "./item.entity";
import { ItemCategory } from "./itemcategory.entity";

@Entity()
export class Category{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    mainClassification: string

    @Column()
    subClassification: string

    @OneToMany(() => Item, item => item.category )
    item:Item[]

    @OneToMany(()=> ItemCategory, itemCategory => itemCategory.category)
    itemCategory: ItemCategory[]

}