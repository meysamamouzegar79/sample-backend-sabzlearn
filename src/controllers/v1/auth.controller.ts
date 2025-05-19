import userModel from "../../models/user";
import banUserModel from "../../models/banPhone";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import registerValidator from "../../validators/register.validator";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  try {
    const validationResult = registerValidator(req.body);
    if (!validationResult) {
      return res.status(422).json({ errors: validationResult });
    }

    const { username, email, password, phone, name } = req.body;
    const isUserExist = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isUserExist) {
      return res.status(409).json({
        message: "Username or email already exists",
      });
    }
    const isUserBan = await banUserModel.findOne({
      phone: phone,
    });
    if (isUserBan) {
      return res.status(409).json({
        message: "your phone number is ban",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const countOfUsers = await userModel.countDocuments();

    const user = await userModel.create({
      email,
      password: hashedPassword,
      username,
      name,
      phone,
      role: countOfUsers === 0 ? "ADMIN" : "USER",
    });

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "30d",
    });
    const userObject = user.toObject();
    Reflect.deleteProperty(userObject, "password");
    return res.status(201).json({
      user: userObject,
      accessToken,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { identifier, password } = req.body;

  const user = await userModel.findOne({
    $or: [
      {
        email: identifier,
      },
      {
        username: identifier,
      },
    ],
  });
  if (!user) {
    return res.status(401).json({
      message: "There is no user with this email or username",
    });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: "your password is not valid" });
  }

  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30 day",
  });

  return res.status(200).json({ accessToken });
};
