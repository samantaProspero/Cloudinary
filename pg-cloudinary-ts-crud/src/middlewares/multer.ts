import multer from 'multer';
import path from 'path';

export default {
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'uploads'),
    filename: (request, file, cb) => {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    },
    // fileFilter: (req, file, cb) => {
    //   let ext = path.extname(file.originalname);  
    //   if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
    //     cb(new Error("File type is not supported"), false);
    //     return;
    //   }
    //   cb(null, true);
    // },
  })
}
