
import { Router } from "express";
import { createRoom, DeleteRoom, DeleteRoombydepartment, DeleteRoombyemployee, getAllRoom, searchbyId, searchbyType, updateRoom, updateRoombydepartment, updateRoombyemployee } from "../controllers/room.conrtoller";
export const RoomRouter: Router = Router({
  strict: true,
});

RoomRouter.get("/type/:type", searchbyType);
RoomRouter.get("/:id", searchbyId);
RoomRouter.put("/:id", updateRoom);
RoomRouter.post("/", createRoom);
RoomRouter.get("/", getAllRoom);
RoomRouter.put("/:id/user/:userId", updateRoombyemployee);
RoomRouter.delete("/:id/user", DeleteRoombyemployee);
RoomRouter.put("/:id/department/:departmentId", updateRoombydepartment);
RoomRouter.delete("/:id/department", DeleteRoombydepartment);
RoomRouter.delete("/:id", DeleteRoom);