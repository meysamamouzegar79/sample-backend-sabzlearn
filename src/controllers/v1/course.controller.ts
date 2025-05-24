import { isValidObjectId } from "mongoose";
import createCourseModel from "../../models/course"

export const createCourse = async (req,res)=>{
   console.log(req.body);
   
        const coverPath = req.files.filename ;

const {name,description,support,categoryId,price,href,discount,status} = req.body;

if(!isValidObjectId(categoryId)){
    return res.status(401).json({message:"categoryId in not valid"})
}
const createCourse= await createCourseModel.create({categoryId,cover:coverPath,description,discount,href,name,price,status,support,creator:req.user._id});
if(!createCourse){
return res.status(400).json({message:"create course is faield"})
}
return res.status(200).json({createCourse})
}

export const createSession = async (req,res)=>{
    
}