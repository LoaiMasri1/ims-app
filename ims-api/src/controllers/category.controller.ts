
import { Category } from "./../entities/category.entity";
import { Request, Response } from "express";


export const createCategory = async (req: Request, res: Response) => {
    const {id ,mainClassification,subClassification  } = req.body;
    const exist = await Category.findOne({ where: { id } });
    if (!exist) {
      return res.status(400).json({
        message: `category with id ${id} not found`,
      });
    }
    try {
      const category =new Category();
      category.mainClassification=mainClassification;
      category.subClassification=subClassification;
       await category.save();
      res.status(201).json({
        message: "category created successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "category creation failed",
        err: error,
      });
    }
  };
  export const deleteCategory = async (req: Request, res: Response) => {
    const {id ,mainClassification,subClassification  } = req.params;
    const category = await Category.findOne({ where: { id } });
    if (!category) {
      return res.status(400).json({
        message: `category with id ${id} not found`,
      });
    }
    try {
        category.remove();
      res.status(201).json({
        message: "category delete successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "category delete failed",
        err: error,
      });
    }
  };
  export const updateCategory = async (req: Request, res: Response) => {
    const {id ,mainClassification,subClassification  } = req.body;
    const category = await Category.findOne({ where: { id } });
    if (!category) {
      return res.status(400).json({
        message: `category with id ${id} not found`,
      });
    }
    try {
        category.mainClassification=mainClassification;
        category.subClassification=subClassification;
       await category.save();
      res.status(201).json({
        message: "category created successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "category creation failed",
        err: error,
      });
    }
  };
  export const searchbyId = async (req: Request, res: Response) => {
    const {id } = req.query as any;
    const category = await Category.find({ where: { id } });
    if (!category) {
      return res.status(400).json({
        message: `category with id ${id} not found`,
      });
    }
    try {
      res.status(201).json({
        category
      });
    } catch (error) {
      res.status(500).json({
        message: "category creation failed",
        err: error,
      });
    }
  };