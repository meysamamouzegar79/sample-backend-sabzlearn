import userModel from "../../models/user";
import banUserModel from "../../models/banPhone";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export const banUser = async (req, res) => {
  try {
    const mainUser = await userModel
      .findOne({
        _id: req.params.id,
      })
      .lean();
    const banUserResult = banUserModel.create({ phone: mainUser.phone });
    if (banUserResult) {
      return res.status(200).json({ message: "user ban shod" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const getAll = async (req, res) => {
  const users = await userModel.find({}).select("-password");
  return res.status(200).json({ users });
};
export const removeUser = async (req, res) => {
  const isValidUserId = mongoose.isValidObjectId(req.params.id);
  if (!isValidUserId) {
    return res.status(409).json({ message: "user id is not valid" });
  }
  const deleteUser = await userModel.findByIdAndDelete(req.params.id);
  if (!deleteUser) {
    return res.status(401).json({ message: "delete user faield" });
  }
  return res.status(200).json({ message: "delete user success" });
};

export const changeRole = async (req, res) => {
  const isValidUserId = mongoose.isValidObjectId(req.params.id);
  if (!isValidUserId) {
    return res.status(409).json({ message: "user id is not valid" });
  }
  const user = await userModel.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const newRole = user.role === "ADMIN" ? "USER" : "ADMIN";

  const updatedUser = await userModel.findByIdAndUpdate(
    req.params.id,
    { role: newRole },
    { new: true, select: "-password" } // بدون پسورد و با نتیجه آپدیت شده
  );
  if (!updatedUser) {
    return res.status(409).json({ message: "update role failed" });
  }
  return res.status(200).json({ updatedUser });
};

export const updateUser = async (req, res) => {
  const { username, email, password, phone } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);
  const updatedUser = await userModel.findByIdAndUpdate(
    { _id: req.user._id },
    { username, email, password: hashedPassword, phone },
    { new: true, select: "-password" }
  );
  if (!updateUser) {
    return res
      .status(500)
      .json({ message: "عملیات اپدیت یوزر با خطا ماوجحه شد" });
  }
  return res.status(200).json({ updatedUser });
};
