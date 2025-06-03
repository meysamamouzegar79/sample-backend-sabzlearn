import { isValidObjectId } from "mongoose";
import createCourseModel from "../../models/course";
import sessionsModel from "../../models/session";

export const createCourse = async (req, res) => {
  const coverPath = req.file.filename;

  const {
    name,
    description,
    support,
    categoryId,
    price,
    href,
    discount,
    status,
  } = req.body;

  if (!isValidObjectId(categoryId)) {
    return res.status(401).json({ message: "categoryId in not valid" });
  }
  const createCourse = await createCourseModel.create({
    categoryId,
    cover: coverPath,
    description,
    discount,
    href,
    name,
    price,
    status,
    support,
    creator: req.user._id,
  });
  if (!createCourse) {
    return res.status(400).json({ message: "create course is faield" });
  }
  const mainCourse = await createCourseModel
    .findById(createCourse._id)
    .populate("creator", "-password");
  return res.status(200).json({ mainCourse });
};

export const createSession = async (req, res) => {
  const courseId = req.params.id;
  const { title, time, free } = req.body;
  const coverPath = req.file.filename;

  const createSessionResult = await sessionsModel.create({
    course: courseId,
    free,
    time,
    title,
    video: coverPath,
  });
  if (!createSessionResult) {
    return res.status(400).json({ message: "create session is faield" });
  }
  return res.status(200).json({ createSessionResult });
};
