import { Router } from "express";
import authMiddlewares from "../../middlewares/auth.middlewares";
import isAdminMiddleware from "../../middlewares/isAdmin.middleware";

const router = Router();

router
    .route("/")
    .get(authMiddlewares, isAdminMiddleware, (req,res)=>{

    })
    .post((req,res)=>{
        
    });

router.route("/:id").delete((req,res)=>{

});

router
    .route("/answer")
    .post(authMiddlewares, isAdminMiddleware, (req,res)=>{

    });


export default router;