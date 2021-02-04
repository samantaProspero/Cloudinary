import {Router} from 'express';
import multer from 'multer';

import uploadConfig from './middlewares/multer';
import ImagesController from './controllers/ImagesController';

import Image from './model/image';

const routes = Router();
const upload = multer(uploadConfig); 

routes.post("/image", upload.single("image"), ImagesController.create);

routes.get("/image", ImagesController.index);

routes.get("/image/:id", ImagesController.show);

routes.delete("/image/:id", ImagesController.delete);

routes.put("/image/:id", upload.single("image"), ImagesController.update);

export default routes;