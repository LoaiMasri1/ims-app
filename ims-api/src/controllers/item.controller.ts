import { Item } from "./../entities/item.entity";
import { Request, Response } from "express";
import { Category } from "../entities/category.entity";


export const createItem = async (req: Request, res: Response) => {
    const { name  } = req.params as any;
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
    const { name  } = req.params as any;
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
    const { name  } = req.params as any;
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
    const { name  } = req.params as any;
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
  export const SearchItemById =async (req: Request, res: Response) => {
    const { id } = req.params as any;
    const item = await Item.findOne({ where: { id } });
    if(!item){
      return res.status(400).json({
        message: `item with this id ${id} not found`,
      });
    } try {
      res.status(201).json({
          item
      });
    }catch (error) {
      res.status(500).json({
        message: "  Failed to search for item by id",
        err: error,
      });
    }
  };
  export const deleteItembyid = async (req: Request, res: Response) => {
    const { id } = req.params as any;
    const item = await Item.findOne({ where: { id } });
    if (!item) {
      return res.status(400).json({
        message: `item with id ${id} not found`,
      });
    }
    try {
     item.remove();
      res.status(201).json({
        message: "item delete successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "item delete failed",
        err: error,
      });
    }
  };
  export const updateCategorybyItem = async (req: Request, res: Response) => {
    const { name,categoryId  } = req.params as any;
    const item = await Item.findOne({ where: { name } });
    if (!item) {
      return res.status(400).json({
        message: `item with name ${name} not found`,
      });
    }
    const category = await Category.findOne({ where: { categoryId } });
    if (!category) {
      return res.status(400).json({
        message: `category with id ${categoryId} not found`,
      });
    }
    try {
      item.category =category;

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
  export const getAllItem =async (req: Request, res: Response) => {
    const item = await Item.find();
    if(!item){
      return res.status(400).json({
        message: `not found any item`,
      });
    } try {
      res.status(201).json({
          item
      });
    }catch (error) {
      res.status(500).json({
        message: "  Failed to search for item",
        err: error,
      });
    }
  };