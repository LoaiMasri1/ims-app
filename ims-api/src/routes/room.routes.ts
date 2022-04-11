
import { Router } from "express";
import {searchbyId, searchbyType, updateRoom } from "../controllers/room.conrtoller";
export const roomRouter: Router = Router({
  strict: true,
});

roomRouter.get("/",searchbyType);
roomRouter.get("/",searchbyId);
roomRouter.post("/",updateRoom);