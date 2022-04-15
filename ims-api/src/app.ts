import { authRouter } from "./routes/auth.routes";
import { userRouter } from "./routes/user.routes";
import express, { Application } from "express";
import cors from "cors";
<<<<<<< HEAD
import { CategoryRouter } from "./routes/category.routes";
import { ItemRouter } from "./routes/item.routers";
=======
import { departmentRouter } from "./routes/department.routes";
import { roomRouter } from "./routes/room.routes";
>>>>>>> origin/develop

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/user", userRouter);
app.use("/auth/v1", authRouter);
<<<<<<< HEAD
app.use("/api/v1/category", CategoryRouter);
app.use("/api/v1/Item", ItemRouter);

=======
app.use("/api/v1/department",departmentRouter);
app.use("/api/v1/room",roomRouter);
>>>>>>> origin/develop
export default app;
