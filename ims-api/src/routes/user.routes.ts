import {
  deleteUserbyEmail,
  SearchByEmail,
  SearchById,
  SearchByPhone,
  SearchByUsername,
  deleteUser,
  Updateuser,
  getAllUser,
  createUser,
} from "./../controllers/user.controller";
import { Router } from "express";

export const UserRouter: Router = Router({
  strict: true,
});

UserRouter.get("/username/:username", SearchByUsername);
UserRouter.get("/email/:email", SearchByEmail);
UserRouter.get("/phone/:phone", SearchByPhone);
UserRouter.get("/:id", SearchById);
UserRouter.put("/:id", Updateuser);
UserRouter.delete("/email/:email", deleteUserbyEmail);
UserRouter.delete("/:id", deleteUser);
UserRouter.get("/", getAllUser);
UserRouter.post("/", createUser);

