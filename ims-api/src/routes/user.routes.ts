import { isAuth } from "./../middlewares/user.middleware";
import {
  
  deleteUserbyEmail,
  SearchByEmail,SearchById,SearchByPhone,SearchByUsername,deleteUser,Updateuser,getAllUser
} from "./../controllers/user.controller";
import { Router } from "express";

export const UserRouter: Router = Router({
  strict: true,
});

UserRouter.get("/:username",SearchByUsername);
UserRouter.get("/:email",SearchByEmail);
UserRouter.get("/:phone",SearchByPhone);
UserRouter.get("/:id",SearchById);
UserRouter.put("/:id", Updateuser);
UserRouter.delete("/:email", deleteUserbyEmail);
UserRouter.delete("/:id", deleteUser);
UserRouter.get("/",getAllUser);


