import { Category } from "./../entities/category.entity";
import { Request, Response } from "express";

export const createCategory = async (req: Request, res: Response) => {
  const { mainClassification, subClassification } = req.body;
  const exist = await Category.findOne({ where: { mainClassification, subClassification },loadRelationIds: true });
  if (exist) {
    return res.status(400).json({
      message: `category found`,
    });
  }
  try {
    const category = new Category();
    category.mainClassification = mainClassification;
    category.subClassification = subClassification;
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
  const { id } = req.params as any;
  const category = await Category.findOne({ where: { id } , loadRelationIds: true  });
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

export const deleteAllCategory = async (req: Request, res: Response) => {
  const category = await Category.find({loadRelationIds: true })
  if (!category.length) {
    return res.status(400).json({
      message: `Not found any category`,
    });
  }
  try {
    Category.delete({});
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
export const updateCategoryNotId = async (req: Request, res: Response) => {
  const { id, mainClassification, subClassification } = req.body;
  const category = await Category.findOne({ where: { id } });
  if (!category) {
    return res.status(400).json({
      message: `category with id ${id} not found`,
    });
  }
  try {
    category.mainClassification = mainClassification;
    category.subClassification = subClassification;
    await category.save();
    res.status(201).json({
      message: "category created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "category update failed",
      err: error,
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params as any;
  const { mainClassification, subClassification } = req.body;
  const category = await Category.findOne({ where: { id }, loadRelationIds: true  });
  if (!category) {
    return res.status(400).json({
      message: `category with id ${id} not found`,
    });
  }
  try {
    category.mainClassification = mainClassification;
    category.subClassification = subClassification;
    await category.save();
    res.status(201).json({
      message: `category with ${id} updated successfully`,
    });
  } catch (error) {
    res.status(500).json({
      message: "category update failed",
      err: error,
    });
  }
};
export const searchById = async (req: Request, res: Response) => {
  const { id } = req.params as any;
  const category = await Category.find({ where: { id }, loadRelationIds: true  });
  if (!category.length) {
    return res.status(400).json({
      message: `category with id ${id} not found`,
    });
  }
  try {
    res.status(201).json({
      category,
    });
  } catch (error) {
    res.status(500).json({
      message: "get category failed!",
      err: error,
    });
  }
};
export const getAllCategory = async (req: Request, res: Response) => {
  const category = await Category.find({loadRelationIds: true});
  if (!category) {
    return res.status(400).json({
      message: `No any category found`,
    });
  }
  try {
    res.status(201).json({
      category,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed on get category",
      err: error,
    });
  }
};

export const getSubOfCategory = async (req: Request, res: Response) => {
  const { sub } = req.params as any;
  const category = await Category.find({ where: { subClassification: sub }, select: ['mainClassification', 'subClassification'], });
  if (!category.length) {
    return res.status(400).json({
      message: `No category of the subClassification ${sub} found!`,
    });
  }
  try {
    res.status(201).json({
      category,
    });
  } catch (error) {
    res.status(500).json({
      message: `failed on get specific category`,
      err: error,
    });
  }
}

export const getMainOfCategory = async (req: Request, res: Response) => {
  const { main } = req.params as any;
  const category = await Category.find({ where: { mainClassification: main }, select: ['mainClassification', 'subClassification'], });
  if (!category.length) {
    return res.status(400).json({
      message: `No category of the classClassification ${main} found!`,
    });
  }
  try {
    res.status(201).json({
      category,
    });
  } catch (error) {
    res.status(500).json({
      message: `failed on get specific category`,
      err: error,
    });
  }
}
