import { register, login } from "../../controllers/v1/auth.controller";
import { Router } from "express";

const router = Router();
router.post("/register", (req, res) => {
  register(req, res);
});
router.post("/login", (req, res) => {
  login(req, res);
});

export default router;
