import { authRouter } from "./routes/auth.routes";
import { userRouter } from "./routes/user.routes";
import express, { Application } from "express";
import session from "express-session";
import cors from "cors";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/user", userRouter);
app.use("/auth/v1", authRouter);

export default app;
