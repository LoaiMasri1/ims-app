import { createUser, confirmUser } from "./../controllers/user.controller";
import { Router } from "express";
export const userRouter: Router = Router({
  strict: true,
});

userRouter.get("/");
userRouter.post("/", createUser);
userRouter.get("/confirm/:confirmationCode", confirmUser);
