import multer from "multer"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '././uploads/fooditem')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + file.originalname)
  }
})

const FoodItemImageUpload = multer({ storage: storage })

export default FoodItemImageUpload