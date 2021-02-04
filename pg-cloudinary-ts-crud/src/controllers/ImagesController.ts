import {Request, Response} from 'express';

import cloudinary from '../middlewares/cloudinary';
import db from '../database/connection';

interface ImageProps{
  name: string;
  avatar: string;
  cloudinary_id: string;
}


export default class ImagesController{
  async index (req: Request, res: Response){
    try {
      const image = await db('images');
      res.json(image);
    } catch (err) {
      console.log(err);
    }
  }

  async create (req: Request, res: Response){
      const { name } = req.body
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      const {secure_url, public_id}  = result
  
      // Create new image
      const image = await db('images').where('cloudinary_id', public_id).select('cloudinary_id').first()
      const trx = await db.transaction(); 
      try {
        await trx('images').insert({
        name: name,
        avatar: secure_url,
        cloudinary_id: public_id,
      }).returning('id');
      // Save image
      await trx.commit()
      return res.status(201).send();
    } catch (err) {
      console.log(err);
    }
  }
  async show (req: Request, res: Response){
    try {
      const {id} = req.params;

      const image = await db('images').select('id', 'name', 'avatar', 'cloudinary_id').where('id', id)
      res.json(image);
    } catch (err) {
      console.log(err);
    }
  }
  async update (req: Request, res: Response){
    try {
      const {id} = req.params;
      let image = await db('images').select('id', 'name', 'avatar', 'cloudinary_id').where('id', id).first()

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
      await db('images').where('id', id).update(data)
      res.json([id, data]);
    } catch (err) {
      console.log(err);
    }
  }
  async delete (req: Request, res: Response){
    try {
      // Find image by id
      const {id} = req.params;
      const image = await db('images').select('id', 'name', 'avatar', 'cloudinary_id').where('id', id).first()
      
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(image.cloudinary_id);
      // Delete image from db
      await db('images').where('id', id).delete()
      return res.status(200).json(image);
    } catch (err) {
      console.log(err);
    }
  }
}
