import { Router } from "express";
import authMiddlewares from "../../middlewares/auth.middlewares";
import isAdminMiddleware from "../../middlewares/isAdmin.middleware";
import { answer, create, getAll, remove } from "../../controllers/v1/contact.controller";

const router = Router();

router
    .route("/")
    .get(authMiddlewares, isAdminMiddleware, (req, res) => {
        getAll(req, res)
    })
    .post((req, res) => {
        create(req, res)
    });

router.route("/:id").delete(authMiddlewares, isAdminMiddleware, (req, res) => {
    remove(req, res)
});

router
    .route("/answer")
    .post(authMiddlewares, isAdminMiddleware, (req, res) => {
        answer(req, res)
    });


export default router;