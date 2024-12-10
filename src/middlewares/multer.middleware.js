import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Resolve the path relative to the project directory
        const uploadPath = path.join(process.cwd(), "public", "temp");
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use original file name
    }
});

export const upload = multer({ storage: storage });
