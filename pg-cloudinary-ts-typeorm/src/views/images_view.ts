import Image from '../models/Images';

export default {
  render(image: Image){
    return {
      id: image.id,
      name: image.name,
      avatar: image.avatar,
      cloudinary_id: image.cloudinary_id,
    };
  },
  renderMany(images: Image[]){
    return images.map (image => this.render(image));
  }
};