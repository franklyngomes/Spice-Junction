import mongoose from "mongoose";
const Schema = mongoose.Schema;
import Joi from "joi";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 6)


const CategorySchemaJoi = Joi.object({
  name: Joi.string().min(3).max(20).required().message('Name cannot be empty!'),
  image: Joi.string().required().message("Image is required!"),
})
const CategorySchema = new Schema ({
  name: {
    type: String
  },
  categoryId: {
    type: String,
    unique: true,
    default: () => nanoid()
  }
},{timestamps: true})

CategorySchema.pre("validate", async function (next){
  if(!this.categoryId){
    this.categoryId = `CAT-${nanoid()}`;
  }
})

const CategoryModel = mongoose.model('category',CategorySchema);
export {CategoryModel, CategorySchemaJoi};