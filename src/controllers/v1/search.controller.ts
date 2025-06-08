import courseModel from "../../models/course"
export const get = async (req, res) => {
  const { keyword } = req.params;
  const courses = await courseModel.find({
    name: { $regex: ".*" + keyword + ".*" },
  });


  return res.json(courses);
};
