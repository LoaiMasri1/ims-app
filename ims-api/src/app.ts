import { authRouter } from "./routes/auth.routes";
import { userRouter } from "./routes/user.routes";
import express, { Application } from "express";
import cors from "cors";
import { departmentRouter } from "./routes/department.routes";
import { roomRouter } from "./routes/room.routes";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/user", userRouter);
app.use("/auth/v1", authRouter);
app.use("/api/v1/department",departmentRouter);
app.use("/api/v1/room",roomRouter);
export default app;
