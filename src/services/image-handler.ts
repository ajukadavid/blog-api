import DatauriParser from 'datauri/parser'
const parser = new DatauriParser();
import { v2 as cloudinary } from 'cloudinary'

export const imageHandler = async (val) => {
  console.log(val)
 const img = parser.format('.png', val.file.buffer)   
   try {
    const result = await cloudinary.uploader.upload(img.content);
    return result.url;
  } catch (error) {
    console.error(error);
  }
}