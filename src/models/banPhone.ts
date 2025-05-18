import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const model = mongoose.model("BanUser", schema);
export default model;
