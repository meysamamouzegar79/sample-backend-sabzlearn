import { banUser } from "../../controllers/v1/user.controller";
import authMiddleware from "../../middlewares/auth.middlewares";
import isAdminMiddleware from "../../middlewares/isAdmin.middleware";
import { Router } from "express";

const router = Router();

router.post("/ban/:id", authMiddleware, isAdminMiddleware, (req, res) => {
  banUser(req, res);
});

export default router;
