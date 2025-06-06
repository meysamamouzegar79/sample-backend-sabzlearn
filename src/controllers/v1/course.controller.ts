import mongoose, { isObjectIdOrHexString, isValidObjectId } from "mongoose";
import courseModel from "../../models/course";
import sessionsModel from "../../models/session";
import courseUserModel from "../../models/course-user"
import categoryModel from "../../models/catrgory"
import commentsModel from "../../models/comments"
import { login } from "./auth.controller";
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
  const createCourse = await courseModel.create({
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
  const mainCourse = await courseModel
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
export const getSissionInfo = async (req, res) => {
  const course = await courseModel.findOne({ href: req.params.href }).lean()
  const session = await sessionsModel.findOne({ _id: req.params.sessionID })
  const sessions = await sessionsModel.find({ course: course._id })
  return res.status(200).json({ session, sessions })
}
export const deleteSession = async (req, res) => {
  const session = await sessionsModel.findOneAndDelete({ _id: req.params.id })
  if (!session) {
    return res.status(500).json({ message: "عملیات با خطا مواجه شد." })
  }
  return res.status(200).json({ message: "عملیات با موفقیت انجام شد" })
}
export const registerCourse = async (req, res) => {
  const courseId = req.params.id;
  const { price } = req.body

  const isUserAlreadyRigisterd = await courseUserModel.findOne({
    user: req.user._id,
    course: courseId
  })
  if (isUserAlreadyRigisterd) {
    return res.status(409).json({ messgae: "دانشجو مورد نظر قبلا در دوره ثبت نام کرده است" })

  }


  const createUserCourse = await courseUserModel.create({
    price,
    course: courseId,
    user: req.user._id
  })
  if (!createUserCourse) {
    return res.status(500).json({ messgae: "عملیات ایجاد خرید دوره با خطا مواجه شد" })
  }
  return res.status(200).json({ createUserCourse })
}
export const getCoursesByCategory = async (req, res) => {
  const { href } = req.params
  const getCategory = await categoryModel.findOne({ href }).lean();

  const getCourses = await courseModel.find({ categoryId: getCategory._id })

  return res.status(200).json({ getCourses })
}
export const getOne = async (req, res) => {

  const { href } = req.params

  const getCourse = await (await (await courseModel.findOne({ href: href })).populate("creator", "-password")).populate("categoryId")
  const sessions = await sessionsModel.find({ course: getCourse._id }).lean()
  const comments = await commentsModel.find({ course: getCourse._id }).populate("creator", "-password").populate("course").lean()
  const courseStudentCount = await courseUserModel.find({ course: getCourse._id }).countDocuments()
  const isUserRegisterThisCourse = !!await courseUserModel.findOne({ user: req.user._id, course: getCourse._id })
  let allComments = [];

  comments.forEach((comment) => {
    comments.forEach((answerComment) => {
      if (String(comment._id) == String(answerComment.mainCommentID)) {
        allComments.push({
          ...comment,
          course: (comment.course as any).name,
          creator: (comment.creator as any).username,
          answerComment,
        });
      }
    });
  });
  return res.status(200).json({ getCourse, sessions,allComments, courseStudentCount, isUserRegisterThisCourse })
}
export const getRelatedCourse = async (req, res) => {

  const { href } = req.params
  const getCourse = await courseModel.findOne({ href })
  let getRelatedCourse = await courseModel.find({ categoryId: getCourse.categoryId })
  getRelatedCourse = getRelatedCourse.filter((course) => {
    course._id !== getCourse._id
  })
  return res.status(200).json({ getRelatedCourse })
}
export const popular = async (req, res) => {

}
export const presell = async (req, res) => {

 
}
export const remove = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "ایدی مورد نظر اعتبار ندارد." })
  }
  const deleteCourse = await courseModel.findOneAndDelete({ _id: req.params.id })
  if (!deleteCourse) {
    return res.status(404).json({ message: "دوره مورد نظر یافت نشد" })
  }
  return res.status(200).json({ message: "دوره با موفقیت حذف شد", deleteCourse })
}