import { isAdmin, isLoggedIn } from "./middlewares/user.middleware";
import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";

import { RoomRouter } from "./routes/room.routes";
import { DepartmentRouter } from "./routes/department.routes";
import { AuthRouter } from "./routes/auth.routes";
import { UserRouter } from "./routes/user.routes";
import { ItemRouter } from "./routes/item.routes";
import { CategoryRouter } from "./routes/category.routes";
import { ItemRoomRouter } from "./routes/itemroom.routes";

const app: Application = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const BASE_URL = "/api/v1";

app.use("/auth/v1", AuthRouter);
app.use(`${BASE_URL}/user`, isLoggedIn, isAdmin, UserRouter);
app.use(`${BASE_URL}/department`, isLoggedIn, isAdmin, DepartmentRouter);
app.use(`${BASE_URL}/room`, isLoggedIn, isAdmin, RoomRouter);
app.use(`${BASE_URL}/category`, isLoggedIn, CategoryRouter);
app.use(`${BASE_URL}/item`, isLoggedIn, ItemRouter);
app.use(`${BASE_URL}/itemroom`, isLoggedIn, ItemRoomRouter);

export default app;
