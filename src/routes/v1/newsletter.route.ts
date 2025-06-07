import { Router } from "express";
import authMiddlewares from "../../middlewares/auth.middlewares";
import isAdminMiddleware from "../../middlewares/isAdmin.middleware";
import { create, getAll } from "../../controllers/v1/newsletter.controller";

const router = Router();

router
    .route("/")
    .get(authMiddlewares, isAdminMiddleware, (req, res) => {
        getAll(req, res)
    })
    .post((req, res) => {
        create(req, res)
    });

export default router;