import { User } from "../entities/user.entity";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Department } from "../entities/department.entity";
import { Room } from "../entities/room.entity";

export const Database = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "ims",
  synchronize: true,
  logging: false,
  entities: [User ,Department,Room],
  migrations: [],
  subscribers: [],
});
