import multer from "multer"

const RestaurantImageUpload = multer({ storage: multer.memoryStorage() })
export default RestaurantImageUpload