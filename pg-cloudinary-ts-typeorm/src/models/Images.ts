import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
 
@Entity('images')
export default class Image {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  avatar: string;

  @Column()
  cloudinary_id: string;

}