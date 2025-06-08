import { Router } from "express";
import authMiddlewares from "../../middlewares/auth.middlewares";
import { accept, answer, createComment, getAll, reject, remove } from "../../controllers/v1/comments.controller";
import isAdminMiddleware from "../../middlewares/isAdmin.middleware";

const router = Router();

router.route("/").post(authMiddlewares, (req, res) => {
  createComment(req, res)
})
router.route("/").get(authMiddlewares, isAdminMiddleware, (req, res) => {
  getAll(req, res)
})
router.route("/:id").delete(authMiddlewares, isAdminMiddleware, (req, res) => {
  remove(req, res)
})
router
  .route("/:id/accept")
  .put(authMiddlewares, isAdminMiddleware, (req, res) => {
    accept(req, res)
  });
router
  .route("/:id/reject")
  .put(authMiddlewares, isAdminMiddleware, (req, res) => {
    reject(req, res)
  });
router
  .route("/:id/answer")
  .post(authMiddlewares, isAdminMiddleware, (req, res) => {
    answer(req, res)
  });

export default router