import { login } from "./../controllers/auth.controller";
import { Router } from "express";
export const authRouter: Router = Router({
  strict: true,
});

authRouter.post("/login", login);
