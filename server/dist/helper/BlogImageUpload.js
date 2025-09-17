import multer from "multer";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '././uploads/blog');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + file.originalname);
    }
});
const BlogImageUpload = multer({ storage: storage });
export default BlogImageUpload;
//# sourceMappingURL=BlogImageUpload.js.map