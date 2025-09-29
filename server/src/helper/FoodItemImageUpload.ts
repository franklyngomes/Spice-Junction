import multer from "multer"
import type { Request } from "express"

const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
    cb(null, '././uploads/fooditem')
  },
  filename: function (req: Request, file: Express.Multer.File, cb :(error: Error | null, destination: string) => void) {
    cb(null, file.fieldname + '-' + file.originalname)
  }
})

const FoodItemImageUpload = multer({ storage: storage })

export default FoodItemImageUpload