import { Database } from "./config/database";
import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import express, { Application, Request, Response, NextFunction } from "express";
const app: Application = express();

app.use(express.json());

Database.initialize()
  .then(() => {
    console.log("Database connection Created");
  })
  .catch((error) => console.log(error));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
