import { Router } from "express";
import { createItemRoom, deleteItemRoom, getAllItemRoom, updateItemRoom } from "../controllers/itemroom.controller";
export const ItemRoomRouter: Router = Router({
  strict: true,
});
ItemRoomRouter.post("/",createItemRoom );
ItemRoomRouter.put("/item/:itemId/room/:roomId",updateItemRoom );
ItemRoomRouter.get("/",getAllItemRoom );
ItemRoomRouter.delete("/item/:itemId/room/:roomId",deleteItemRoom );
