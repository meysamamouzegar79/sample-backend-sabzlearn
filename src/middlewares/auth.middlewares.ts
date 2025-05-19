import userModel from "../models/user";
import jwt from "jsonwebtoken";

export = async (req, res, next) => {
  const authHeader = req.header("Authorization").split(" ");
  if (authHeader.length !== 1) {
    return res.status(401).json({
      message: "this route is protected and should be login",
    });
  }
  console.log(authHeader[0]);

  const token = authHeader[0];
  try {
    const jwtPayload = jwt.verify(token, process.env.JWT_SECRET) as {
      id: string;
    };
    const user = await userModel.findById(jwtPayload.id).lean();
    Reflect.deleteProperty(user, "password");
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json(error);
  }
};
