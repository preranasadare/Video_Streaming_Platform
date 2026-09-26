import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp")  //cb=callback function, first parameter is error and second parameter is destination folder
  },
  filename: function (req, file, cb) {
    
      cb(null, file.originalname)
  }
    })

export const upload = multer({
     storage,
    })