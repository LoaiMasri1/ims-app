import { Router } from "express";
import { getItemRoom, createItemRoom, deleteItemRoom, getAllItemRoom, updateItemRoom } from "../controllers/itemroom.controller";
export const ItemRoomRouter: Router = Router({
  strict: true,
});
ItemRoomRouter.post("/",createItemRoom );
ItemRoomRouter.put("/item/:itemId/room/:roomId",updateItemRoom );
ItemRoomRouter.get("/",getAllItemRoom );
ItemRoomRouter.get("/item/:itemId/room/:roomId",getItemRoom );
ItemRoomRouter.delete("/item/:itemId/room/:roomId",deleteItemRoom );
