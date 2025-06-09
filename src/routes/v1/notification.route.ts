import { Router } from "express";
import authMiddlewares from "../../middlewares/auth.middlewares";
import isAdminMiddleware from "../../middlewares/isAdmin.middleware";
import { create, get, seen } from "../../controllers/v1/notification.controller";

const router = Router();

router
    .route("/")
    .post(authMiddlewares, isAdminMiddleware, (req, res) => {
        create(req, res)
    });

router
    .route("/admins")
    .get(authMiddlewares, isAdminMiddleware, (req, res) => {
        get(req, res)
    });

router
    .route("/:id/see")
    .put(authMiddlewares, isAdminMiddleware, (req, res) => {
        seen(req, res)
    });

export default router;