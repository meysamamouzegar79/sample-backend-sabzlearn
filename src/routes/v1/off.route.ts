import { Router } from "express";
import authMiddlewares from "../../middlewares/auth.middlewares";
import isAdminMiddleware from "../../middlewares/isAdmin.middleware";
import { create, get, seen } from "../../controllers/v1/notification.controller";

const router = Router();

router
    .route("/")
    .get(authMiddlewares, isAdminMiddleware, (req, res) => {

    })
    .post(authMiddlewares, isAdminMiddleware, (req, res) => {

    });

router
    .route("/all")
    .post(authMiddlewares, isAdminMiddleware, (req, res) => {

    });

router.route("/:code").post(authMiddlewares, (req, res) => {

});

router.route("/:id").delete(authMiddlewares, (req, res) => {

});

export default router;