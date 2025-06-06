import {
  createCourse,
  createSession,
  deleteSession,
  getCoursesByCategory,
  getOne,
  getRelatedCourse,
  getSissionInfo,
  popular,
  presell,
  registerCourse,
  remove,
} from "../../controllers/v1/course.controller";
import authMiddleware from "../../middlewares/auth.middlewares";
import isAdminMiddleware from "../../middlewares/isAdmin.middleware";
import { Router } from "express";
import multer from "multer";
import diskStorage from "../../utils/uploader";

const upload = multer({
  storage: diskStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
});
const router = Router();

router.post(
  "/",
  upload.single("cover"),
  authMiddleware,
  isAdminMiddleware,
  (req, res) => {
    createCourse(req, res);
  }
);
router.get("/:href", authMiddleware, (req, res) => {
  getOne(req, res)
})
router.get("/related/:href", (req, res) => {
  getRelatedCourse(req, res)
})
router.route("/popular").get( (req, res) => {
  popular(req, res)
})
router.route("/presell").get( (req, res) => {
  presell(req, res)
})
router.get("/category/:href", (req, res) => {
  getCoursesByCategory(req, res)
})
router.post(
  "/:id/sessions",
  upload.single("video"),
  authMiddleware,
  isAdminMiddleware,
  (req, res) => {
    createSession(req, res);
  }
);
router.post(
  "/:id/register",
  authMiddleware,
  (req, res) => {
    registerCourse(req, res);
  }
);

router.get("/:href/:sessionID", (req, res) => {
  getSissionInfo(req, res)
})

router.delete("/session/:id", (req, res) => {
  deleteSession(req, res)
})
router.delete("/:id", authMiddleware, isAdminMiddleware, (req, res) => {
  remove(req, res)
})

export default router;
