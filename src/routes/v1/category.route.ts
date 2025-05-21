import {
  create,
  getAll,
  remove,
  update,
} from "../../controllers/v1/category.controller";
import authMiddleware from "../../middlewares/auth.middlewares";
import isAdminMiddleware from "../../middlewares/isAdmin.middleware";
import { Router } from "express";

const router = Router();

router.post("/", authMiddleware, isAdminMiddleware, (req, res) => {
  create(req, res);
});
router.get("/", authMiddleware, isAdminMiddleware, (req, res) => {
  getAll(req, res);
});
router.delete("/:id", authMiddleware, isAdminMiddleware, (req, res) => {
  remove(req, res);
});
router.put("/:id", authMiddleware, isAdminMiddleware, (req, res) => {
  update(req, res);
});

export default router;
