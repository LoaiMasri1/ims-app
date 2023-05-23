import "reflect-metadata";
import { ItemRoom } from "./../entities/itemroom.entity";
import { User } from "../entities/user.entity";
import { DataSource } from "typeorm";
import { Department } from "../entities/department.entity";
import { Room } from "../entities/room.entity";
import { Item } from "../entities/item.entity";
import { Category } from "../entities/category.entity";
import { config } from "dotenv";
config();
export const Database = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Department, Room, Item, Category, ItemRoom],
});
