import { login, register, confirmUser, changePassword, resetPassword, forgotPassword } from "./../controllers/auth.controller";
import { Router } from "express";
export const AuthRouter: Router = Router({
  strict: true,
});

AuthRouter.post("/login", login);
AuthRouter.post("/register", register);
AuthRouter.get("/confirm/:token", confirmUser);
//AuthRouter.get("/logout",isLoggedIn, logout);
AuthRouter.post("/forgetPassword", forgotPassword);
AuthRouter.get("/resetPassword/:token", resetPassword);
AuthRouter.post("/changePassword/:token", changePassword);
