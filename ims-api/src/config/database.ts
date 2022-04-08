import { User } from "../entities/user.entity";
import "reflect-metadata";
import { DataSource } from "typeorm";

export const Database = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "ims",
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});
