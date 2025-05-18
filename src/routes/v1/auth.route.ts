import { register } from "../../controllers/v1/auth.controller";
import { Router } from "express";

const router = Router();
router.post("/register", (req, res) => {
  register(req, res);
});

export default router;
