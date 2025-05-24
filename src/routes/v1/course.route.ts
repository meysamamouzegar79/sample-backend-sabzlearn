import {
createCourse
} from "../../controllers/v1/course.controller";
import authMiddleware from "../../middlewares/auth.middlewares";
import isAdminMiddleware from "../../middlewares/isAdmin.middleware";
import { Router } from "express";
import multer from "multer";
import  diskStorage  from "../../utils/uploader";

const upload = multer({ 
  storage: diskStorage, 
  limits: { fileSize: 10 * 1024 * 1024 },
});
const router = Router();

router.post('/',upload.single('cover'),authMiddleware, isAdminMiddleware,(req,res)=>{
    createCourse(req,res)
})
router.post('/:id/sessions',authMiddleware, isAdminMiddleware,(req,res)=>{
    createCourse(req,res)
})
export default router;
