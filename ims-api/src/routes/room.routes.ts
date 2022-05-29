import { Router } from "express";
import {
  createRoom,
  DeleteRoom,
  DeleteRoombydepartment,
  DeleteRoombyemployee,
  getAllRoom,
  searchbyId,
  searchbyType,
  updateRoom,
  updateRoombydepartment,
  updateRoombyemployee,
} from "../controllers/room.conrtoller";
import { isAdmin } from "../middlewares/user.middleware";
export const RoomRouter: Router = Router({
  strict: true,
});

RoomRouter.get("/type/:type", isAdmin, searchbyType);
RoomRouter.get("/:id", isAdmin, searchbyId);
RoomRouter.put("/:id", isAdmin, updateRoom);
RoomRouter.post("/", isAdmin, createRoom);
RoomRouter.get("/", getAllRoom);
RoomRouter.put("/:id/user/:userId", isAdmin, updateRoombyemployee);
RoomRouter.delete("/:id/user", isAdmin, DeleteRoombyemployee);
RoomRouter.put(
  "/:id/department/:departmentId",
  isAdmin,
  updateRoombydepartment
);
RoomRouter.delete("/:id/department", DeleteRoombydepartment);
RoomRouter.delete("/:id", isAdmin, DeleteRoom);
