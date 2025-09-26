import cloudinary from "../config/cloudinary.js";

export const uploadToCloudinary = (file: Express.Multer.File, folder = "spice_junction_restaurants") =>
  new Promise<any>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(file.buffer);
  });