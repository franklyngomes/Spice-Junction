import cloudinary from "../config/cloudinary.js";
export const uploadToCloudinary = (file, folder = "spice_junction_restaurants") => new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder }, (error, result) => {
        if (error)
            return reject(error);
        resolve(result);
    });
    stream.end(file.buffer);
});
//# sourceMappingURL=CloudinaryUpload.js.map