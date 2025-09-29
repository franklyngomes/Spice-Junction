import multer from "multer";
const storage = multer.memoryStorage();
// const RestaurantImageUpload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = ["image/jpeg", "image/png", "image/jpg","image/avif", "image/webp","application/pdf"];
//     if (allowedTypes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new Error("Only images and PDF files are allowed"));
//     }
//   }
// });
const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp",
        "image/avif",
        "application/pdf"
    ];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error("Only images and PDF files are allowed"));
    }
};
const RestaurantFileUpload = multer({ storage, fileFilter }).fields([
    { name: "image", maxCount: 1 },
    { name: "fssai", maxCount: 1 },
]);
export default RestaurantFileUpload;
//# sourceMappingURL=RestaurantFileUpload.js.map