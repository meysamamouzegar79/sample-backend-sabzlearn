import mongoose from "mongoose";

const schema = new mongoose.Schema(
   {
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const model = mongoose.model("NewsLetter", schema);
export default model;
