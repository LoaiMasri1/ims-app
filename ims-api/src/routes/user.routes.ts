import { isAuth } from "./../middlewares/user.middleware";
import {
  updateUser,
  deleteUserbyEmail,
  searchbyName,
} from "./../controllers/user.controller";
import { Router } from "express";

export const UserRouter: Router = Router({
  strict: true,
});

UserRouter.get("/:username", isAuth, searchbyName);
UserRouter.put("/", updateUser);
UserRouter.delete("/", deleteUserbyEmail);
