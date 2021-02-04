import {Router} from 'express';
import multer from 'multer';

import uploadConfig from './middlewares/multer';
import ImagesController from './controllers/ImagesController';

const imagesController = new ImagesController();


const routes = Router();
const upload = multer(uploadConfig); 

routes.post("/image", upload.single("image"), imagesController.create);

routes.get("/image", imagesController.index);

routes.get("/image/:id", imagesController.show);

routes.delete("/image/:id", imagesController.delete);

routes.put("/image/:id", upload.single("image"), imagesController.update);

export default routes;