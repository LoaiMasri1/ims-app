import { ItemRoom } from "./../entities/itemroom.entity";
import { Request, Response } from "express";
import { Room } from "../entities/room.entity";
import { Item } from "../entities/item.entity";
import { validate } from "class-validator";
import { objToString } from "../utility/user.utils";

export const createItemRoom = async (req: Request, res: Response) => {
    const{itemId,roomId,numberOfItem}=req.body as any;
    const exist = await ItemRoom.findOne({ where: { itemId, roomId } });
    const item = await Item.findOne({ where: { id:itemId } });
    const room = await Room.findOne({ where: { id:roomId } });
    if(!item){
        return res.status(400).json({
            message: `item with id ${itemId} not found`, 
          });
    }
    if(!room){
        return res.status(400).json({
            message: `room with id ${roomId} not found`, 
          });
    }
    if (exist) {
      return res.status(400).json({
        message: `item with item ${itemId} and room ${roomId} already exist`, 
      });
    }
    try {
      const itemroom =new ItemRoom();
      itemroom.itemId = itemId;
      itemroom.roomId = roomId;
      itemroom.numberOfItem = numberOfItem;
      validate(itemroom).then(async (errors) => {
        if (errors.length > 0) {
          const { constraints } = errors[0];
          res.status(422).json({
            message: objToString(constraints),
          });
        } else {
          await itemroom.save();
          res.status(201).json({
            message: "ItemRoom created successfully",
          });
        }
      });
    } catch (error) {
      res.status(500).json({
        message: "ItemRoom creation failed",
        err: error,
      });
    }
  };
  export const deleteItemRoom = async (req: Request, res: Response) => {
    const { itemId, roomId  } = req.params as any;
    const itemroom = await ItemRoom.findOne({ where: { itemId, roomId } });
    if (!itemroom) {
      return res.status(400).json({
        message: `item with item ${itemId} and room ${roomId} not found`,
      });
    }
    try {
      itemroom.remove();
      res.status(201).json({
        message: "itemroom deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "itemroom deleted failed",
        err: error,
      });
    }
  };
  export const updateItemRoom = async (req: Request, res: Response) => {
    const { itemId,roomId } = req.params as any;
    const { numberOfItem  } = req.body as any;
    const itemroom = await ItemRoom.findOne({ where: { roomId,itemId } });
    if (!itemroom) {
      return res.status(400).json({
        message: `item with item ${itemId} and room ${roomId} not found`,
      });
    }
    try {
      itemroom.numberOfItem=numberOfItem;
      await itemroom.save();
      res.status(201).json({
        message: "itemroom update successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "itemroom update failed",
        err: error,
      });
    }
  };
  export const getAllItemRoom =async (req: Request, res: Response) => {
    const itemroom = await ItemRoom.find({relations: {item:true, room:true}});;
    if(!itemroom){
      return res.status(400).json({
        message: `not found any item`,
      });
    } try {
      res.status(201).json({
          itemroom
      });
    }catch (error) {
      res.status(500).json({
        message: "  Failed to search for item",
        err: error,
      });
    }
  };

  export const getItemRoom = async (req: Request, res: Response) => {
    const { itemId,roomId } = req.params as any;
    const itemroom = await ItemRoom.findOne({ where: { roomId,itemId } });
    if (!itemroom) {
      return res.status(400).json({
        message: `item with item ${itemId} and room ${roomId} not found`,
      });
    }
    try {
      res.status(201).json({
        itemroom
      });
    } catch (error) {
      res.status(500).json({
        message: "itemroom update failed",
        err: error,
      });
    }
  };