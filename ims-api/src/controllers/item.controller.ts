import { Item } from "./../entities/item.entity";
import { Request, Response } from "express";
import { Category } from "../entities/category.entity";
import { validate } from "class-validator";
import { objToString } from "../utility/user.utils";

export const createItem = async (req: Request, res: Response) => {
  //const {name} = req.params as any;
  const { categoryId, name } = req.body as any;
  const exist = await Item.findOne({ where: { name } });
  const category = await Category.findOne({ where: { id: categoryId } });
  if (!category) {
    return res.status(400).json({
      message: `category with id ${categoryId} not found`,
    });
  }
  if (exist) {
    return res.status(400).json({
      message: `item with name ${name} already exist`,
    });
  }
  try {
    const item = new Item();
    item.name = name;
    item.category = categoryId;
    validate(item).then(async (errors) => {
      if (errors.length > 0) {
        const { constraints } = errors[0];
        res.status(422).json({
          message: objToString(constraints),
        });
      } else {
        await item.save();
        res.status(201).json({
          message: "Item created successfully",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "item creation failed",
      err: error,
    });
  }
};
export const deleteItem = async (req: Request, res: Response) => {
  const { name } = req.params as any;
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
  const { id } = req.params as any;
  const { categoryId, name } = req.body as any;
  const item = await Item.findOne({ where: { id } });
  const category = await Category.findOne({ where: { id: categoryId } });
  if (!item) {
    return res.status(400).json({
      message: `item with id ${id} not found`,
    });
  }
  if (!category) {
    return res.status(400).json({
      message: `category with id ${categoryId} not found`,
    });
  }
  try {
    item.name = name;
    item.category = categoryId;
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
  const { name } = req.params as any;
  const item = await Item.find({ where: { name } });
  if (!item) {
    return res.status(400).json({
      message: `item with name ${name} not found`,
    });
  }
  try {
    res.status(201).json({
      item,
    });
  } catch (error) {
    res.status(500).json({
      message: "item creation failed",
      err: error,
    });
  }
};
export const SearchItemById = async (req: Request, res: Response) => {
  const { id } = req.params as any;
  const item = await Item.findOne({
    where: { id },
    relations: { category: true },
    loadRelationIds: true,
  });
  if (!item) {
    return res.status(400).json({
      message: `item with this id ${id} not found`,
    });
  }
  try {
    res.status(201).json({
      item,
    });
  } catch (error) {
    res.status(500).json({
      message: "  Failed to search for item by id",
      err: error,
    });
  }
};
export const deleteItembyid = async (req: Request, res: Response) => {
  const { id } = req.params as any;
  const item = await Item.findOne({
    where: { id },
    relations: { category: true, itemRoom: true },
    loadRelationIds: true,
  });
  if (!item) {
    return res.status(400).json({
      message: `item with id ${id} not found`,
    });
  }
  if(item.itemRoom.length>0){
    return res.status(400).json({
      message: `item with id ${id} already in room`,
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
  const { name, categoryId } = req.params as any;
  const item = await Item.findOne({ where: { name } });
  if (!item) {
    return res.status(400).json({
      message: `item with name ${name} not found`,
    });
  }
  const category = await Category.findOne({ where: { id: categoryId } });
  if (!category) {
    return res.status(400).json({
      message: `category with id ${categoryId} not found`,
    });
  }
  try {
    item.name = name;
    item.category = category;
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
export const getAllItem = async (req: Request, res: Response) => {
  const item = await Item.find({ relations: { category: true } });
  if (!item) {
    return res.status(400).json({
      message: `not found any item`,
    });
  }
  try {
    res.status(201).json({
      item,
    });
  } catch (error) {
    res.status(500).json({
      message: "  Failed to search for item",
      err: error,
    });
  }
};
