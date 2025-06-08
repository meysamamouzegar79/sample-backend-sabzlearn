import { Router } from "express";
import { get } from "../../controllers/v1/search.controller";

const router = Router();

router.route("/:keyword").get((req,res)=>{
    get(req,res)
});

export default router;