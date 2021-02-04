import {Request, Response} from 'express';

import cloudinary from '../middlewares/cloudinary';
import Image from '../model/image';

interface ImageProps{
  name: string;
  avatar: string;
  cloudinary_id: string;
}


export default{
  async index (req: Request, res: Response){
    try {
      let image = await Image.find();
      res.json(image);
    } catch (err) {
      console.log(err);
    }
  },

  async create (req: Request, res: Response){
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
  
      // Create new image
      let image = new Image({
        name: req.body.name,
        avatar: result.secure_url,
        cloudinary_id: result.public_id,
      });
      // Save image
      await image.save();
      res.json(image);
    } catch (err) {
      console.log(err);
    }
  },
  async show (req: Request, res: Response){
    try {
      let image = await Image.findById(req.params.id);
      res.json(image);
    } catch (err) {
      console.log(err);
    }
  },
  async update (req: Request, res: Response){
    try {
      let image = await Image.findById(req.params.id);
      const {name, avatar, cloudinary_id} = image
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(cloudinary_id);
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      const data = {
        name: req.body.name || name,
        avatar: result.secure_url || avatar,
        cloudinary_id: result.public_id || cloudinary_id,
      };
      image = await Image.findByIdAndUpdate(req.params.id, data, { new: true });
      res.json(image);
    } catch (err) {
      console.log(err);
    }
  },
  async delete (req: Request, res: Response){
    try {
      // Find image by id
      let image = await Image.findById(req.params.id);
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(image.cloudinary_id);
      // Delete image from db
      if(image){
        await image.remove();
      }
      res.json(image);
    } catch (err) {
      console.log(err);
    }
  },
}
