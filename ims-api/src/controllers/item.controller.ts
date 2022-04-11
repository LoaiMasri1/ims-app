import { Item } from "./../entities/item.entity";
import { Request, Response } from "express";


export const createItem = async (req: Request, res: Response) => {
    const {id , name  } = req.body;
    const exist = await Item.findOne({ where: { name } });
    if (!exist) {
      return res.status(400).json({
        message: `item with name ${name} not found`,
      });
    }
    try {
      const item =new Item();
      item.name=name;
       await item.save();
      res.status(201).json({
        message: "item created successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "item creation failed",
        err: error,
      });
    }
  };
  export const deleteItem = async (req: Request, res: Response) => {
    const { name  } = req.body;
    const item = await Item.findOne({ where: { name } });
    if (!item) {
      return res.status(400).json({
        message: `item with name ${name} not found`,
      });
    }
    try {
      item.remove();
      res.status(201).json({
        message: "item deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "item deleted failed",
        err: error,
      });
    }
  };
  export const updateItem = async (req: Request, res: Response) => {
    const { name  } = req.body;
    const item = await Item.findOne({ where: { name } });
    if (!item) {
      return res.status(400).json({
        message: `item with name ${name} not found`,
      });
    }
    try {
      item.name=name;
      await item.save();
      res.status(201).json({
        message: "item update successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "item update failed",
        err: error,
      });
    }
  };
  export const searchItem = async (req: Request, res: Response) => {
    const { name  } = req.body;
    const item = await Item.find({ where: { name } });
    if (!item) {
      return res.status(400).json({
        message: `item with name ${name} not found`,
      });
    }
    try {

      res.status(201).json({
          item
      });
    } catch (error) {
      res.status(500).json({
        message: "item creation failed",
        err: error,
      });
    }
  };