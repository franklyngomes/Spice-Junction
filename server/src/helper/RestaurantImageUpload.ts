import multer from "multer"
import type { Request } from "express"

const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb:(error: Error | null, destination: string) => void) {
    cb(null, '././uploads/restaurant')
  },
  filename: function (req: Request, file: Express.Multer.File, cb:(error: Error | null, destination: string) => void) {
    cb(null, "restaurant" + '-' + file.originalname)
  }
})

const RestaurantImageUpload = multer({ storage: storage })
export default RestaurantImageUpload