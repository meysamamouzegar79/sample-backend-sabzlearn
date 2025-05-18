import userModel from "../../models/user";
import banUserModel from "../../models/banPhone";

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
