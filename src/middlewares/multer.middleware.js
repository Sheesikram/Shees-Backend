import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {//the file is in only multer and it will have all the file cb is a callback function
      cb(null, ",/public/temp")
    },
    filename: function (req, file, cb) {
      //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname)
    }
  })
  
  export const upload = multer({ storage: storage })