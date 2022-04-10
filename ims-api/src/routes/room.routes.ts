
import { Router } from "express";
import {searchRoom, updateRoom } from "../controllers/room.conrtoller";
export const roomRouter: Router = Router({
  strict: true,
});

roomRouter.get("/");
roomRouter.post("/",updateRoom);