import { banUser } from "../../controllers/v1/user.controller";
import { Router } from "express";

const router = Router();

router.post("/ban/:id", (req, res) => {
  banUser(req, res);
});

export default router;
