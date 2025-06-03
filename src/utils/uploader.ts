import multer from "multer";
import path from "path";
import fs from "fs";
export = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "..", "public", "courses", "covers");

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + String(Math.random() * 9999);
    const ext = path.extname(file.originalname);
    cb(null, filename + ext);
  },
});
