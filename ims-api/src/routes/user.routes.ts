import { createUser, confirmUser, updateUser, deleteUserbyEmail } from "./../controllers/user.controller";
import { Router } from "express";
import { searchbyName } from "../controllers/department.controller";
export const userRouter: Router = Router({
  strict: true,
});

userRouter.get("/:username",searchbyName);
userRouter.post("/", createUser);
userRouter.put("/", updateUser);
userRouter.get("/confirm/:confirmationCode", confirmUser);
userRouter.delete("/", deleteUserbyEmail);
