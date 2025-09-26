import multer from "multer"

const storage = multer.memoryStorage();

const RestaurantImageUpload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg","image/avif", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only images and PDF files are allowed"));
    }
  }
});

export default RestaurantImageUpload;