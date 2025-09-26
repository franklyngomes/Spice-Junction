import cloudinary from "../config/cloudinary.js";

export const uploadToCloudinary = (file: Express.Multer.File) =>
  new Promise<any>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
     {
        folder: "spice_junction_restaurants",
        resource_type: "auto",
        public_id: `${Date.now()}-${file.originalname}`,
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return reject(error);
        }
        resolve(result);
      }
    );
    stream.end(file.buffer);
  });