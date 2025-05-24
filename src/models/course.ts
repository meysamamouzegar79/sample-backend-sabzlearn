import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    support: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    discount:{
      type:Number,
      required: true,
    },
    categoryId:{
      type:mongoose.Types.ObjectId,
      ref: "Caregory",
      required: true,
    },
     creator: {
          type: mongoose.Types.ObjectId,
          ref: "User",
    },
  },
  { timestamps: true }
);

schema.virtual('session',{
    ref:'Session',
    localField:'_id',
    foreignField:'course'
});
schema.virtual('comments',{
    ref:'Comment',
    localField:'_id',
    foreignField:'course'
})
const model = mongoose.model("Course", schema);
export default model;
