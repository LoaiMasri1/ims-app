import { UserController } from './../controllers/user.controller';
import { Router, Request, Response, NextFunction } from "express";

export const userRouter: Router = Router({
  strict: true,
});

userRouter.get("/", UserController.getAll);
userRouter.post("/", UserController.create);
