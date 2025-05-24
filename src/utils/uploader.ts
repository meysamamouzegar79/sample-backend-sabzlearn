import multer from "multer"
import path from "path"
import fs from "fs";
export = multer.diskStorage({
   destination: (req, file, cb) => {
        const dir = path.join(__dirname, '..', 'public', 'courses', 'covers');

        // چک کردن وجود مسیر و ایجاد آن در صورت نیاز
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true }); // ایجاد پوشه به صورت بازگشتی
        }

        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const filename = Date.now() + String(Math.random() * 9999);
        const ext = path.extname(file.originalname);
        cb(null, filename + ext);
    }
    
})