import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import { RoomRouter } from "./routes/room.routes";
import { DepartmentRouter } from "./routes/department.routes";
import { AuthRouter } from "./routes/auth.routes";
import { UserRouter } from "./routes/user.routes";
import { ItemRouter } from "./routes/item.routes";
import { CategoryRouter } from "./routes/category.routes";

const app: Application = express();

app.use(cors());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const BASE_URL = "/api/v1";

app.use("/auth/v1", AuthRouter);
app.use(`${BASE_URL}/user`, UserRouter);
app.use(`${BASE_URL}/department`, DepartmentRouter);
app.use(`${BASE_URL}/room`, RoomRouter);
app.use(`${BASE_URL}/category`, CategoryRouter);
app.use(`${BASE_URL}/item`, ItemRouter);

export default app;
