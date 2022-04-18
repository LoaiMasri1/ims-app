
import { Router } from "express";
import {searchbyId, searchbyType, updateRoom } from "../controllers/room.conrtoller";
export const RoomRouter: Router = Router({
  strict: true,
});

RoomRouter.get("/", searchbyType);
RoomRouter.get("/", searchbyId);
RoomRouter.put("/", updateRoom);