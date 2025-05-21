import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  href: { type: String, required: true },
});

const model = mongoose.model("Caregory", schema);
export default model;
