import multer from "multer"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '././uploads/restaurant')
  },
  filename: function (req, file, cb) {
    cb(null, "restaurant" + '-' + file.originalname)
  }
})

const RestaurantImageUpload = multer({ storage: storage })
export default RestaurantImageUpload