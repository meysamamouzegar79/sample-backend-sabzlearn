import { isValidObjectId } from "mongoose";
import categoryModel from "../../models/catrgory";
export const create = async (req, res) => {
  const { title, href } = req.body;

  const createCategory = await categoryModel.create({
    href,
    title,
  });
  if (!categoryModel) {
    return res.status(500).json({ message: "create category is faield" });
  }
  return res.status(200).json({ createCategory });
};
export const getAll = async (req, res) => {
  const getCategories = await categoryModel.find({}).lean();
  if (!getCategories) {
    return res.status(500).json({
      message: "get all categories has problem",
    });
  }
  return res.status(200).json({ getCategories });
};
export const remove = async (req, res) => {
  const id = req.params.id;
  if (!isValidObjectId(id)) {
    return res.status(401).json({ message: "category id is not valid" });
  }

  const deleteCategory = await categoryModel.findByIdAndDelete(id);
  if (!deleteCategory) {
    return res
      .status(400)
      .json({ message: "delete category is faield call to admin" });
  }

  return res.status(200).json({ message: "delete category is success" });
};
export const update = async (req, res) => {
  const categoryId = req.params.id;
  const { href, title } = req.body;
  if (!isValidObjectId(categoryId)) {
    return res.status(401).json({ message: "category id is not valid" });
  }

  const updateCategory = await categoryModel.findByIdAndUpdate(
    categoryId,
    {
      href,
      title,
    },
    { new: true, select: "-password" }
  );

  if (!updateCategory) {
    return res.status(401).json({ message: "update category is faield" });
  }

  return res.status(200).json({ updateCategory });
};
