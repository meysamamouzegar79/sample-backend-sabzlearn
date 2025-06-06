import commentsModel from "../../models/comments"
import courseModel from "../../models/course"
export const createComment = async (req, res) => {
  const { body,
    courseHref,
    score, } = req.body
  const course = await courseModel.findOne({ href: courseHref }).lean()
  const createComment = await commentsModel.create({
    course: course._id,
    creator: req.user._id,
    score,
    body,
    isAccept: 0,
    isAnswer: 0
  })
  if (!createComment) {
    return res.status(404).json({ message: "در حال حاضر سرویس مورد نظر قادر به پاسخگویی نمی باشد" })
  }
  return res.status(201).json({ createComment })
}
export const getAll = async (req, res) => {
  const comments = await commentsModel
    .find()
    .populate("course")
    .populate("creator", "-password")
    .lean();
  return res.json(comments);
};

export const remove = async (req, res) => {
  const deletedComment = await commentsModel.findOneAndDelete({
    _id: req.params.id,
  });

  if (!deletedComment) {
    return res.status(404).json({
      message: "Comment not found !!",
    });
  }

  return res.json(deletedComment);
};

export const accept = async (req, res) => {
  const acceptedComment = await commentsModel.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { isAccept: 1 }
  );

  if (!acceptedComment) {
    return res.status(404).json({
      message: "Comment not found !!",
    });
  }

  return res.json({ message: "Comment accepted successfully" });
};

export const reject = async (req, res) => {
  const rejectedComment = await commentsModel.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { isAccept: 0 }
  );

  if (!rejectedComment) {
    return res.status(404).json({
      message: "Comment not found !!",
    });
  }

  return res.json({ message: "Comment rejected successfully" });
};

export const answer = async (req, res) => {
  const { body } = req.body;

  const acceptedComment = await commentsModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      isAccept: 1,
    }
  );

  if (!acceptedComment) {
    return res.status(404).json({
      message: "Comment not found !!",
    });
  }

  const answerComment = await commentsModel.create({
    body,
    course: acceptedComment.course,
    creator: req.user._id,
    isAnswer: 1,
    isAccept: 1,
    mainCommentID: req.params.id,
  });

  return res.status(201).json(answerComment);
};