import {Request, Response} from 'express';
import { getRepository } from 'typeorm';

import cloudinary from '../middlewares/cloudinary';
import imageView from '../views/images_view';

import Image from '../models/Images';

export default class ImagesController{
  async index (req: Request, res: Response){
    try {
      const imagesRepository = getRepository(Image)
      const images = await imagesRepository.find()

      res.json(imageView.renderMany(images));
    } catch (err) {
      console.log(err);
    }
  }

  async create (req: Request, res: Response){
    try{
      const { name } = req.body
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      const {secure_url, public_id}  = result
  
      // Create new image
      const imagesRepository = getRepository(Image)
      const data = {
      name: name,
      avatar: secure_url,
      cloudinary_id: public_id,
      }

      const image = imagesRepository.create(data)
      await imagesRepository.save(image)
      return res.status(201).json(image);
    } catch (err) {
      console.log(err);
    }
  }
  async show (req: Request, res: Response){
    try {
      const {id} = req.params;

      const imagesRepository = getRepository(Image)
      const image = await imagesRepository.findOneOrFail(id)
      res.json(imageView.render(image));
    } catch (err) {
      console.log(err);
    }
  }
  async update (req: Request, res: Response){
    try {
      const {id} = req.params;
      const imagesRepository = getRepository(Image)
      const image = await imagesRepository.findOneOrFail(id)

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
      await imagesRepository.update(image, data)
      res.json([id, data]);
    } catch (err) {
      console.log(err);
    }
  }
  async delete (req: Request, res: Response){
    try {
      // Find image by id
      const {id} = req.params;
      const imagesRepository = getRepository(Image)
      const image = await imagesRepository.findOneOrFail(id)

      // Delete image from cloudinary
      await cloudinary.uploader.destroy(image.cloudinary_id);
      // Delete image from db
      await imagesRepository.remove(image)
      return res.status(200).json(imageView.render(image));
    } catch (err) {
      console.log(err);
    }
  }
}
