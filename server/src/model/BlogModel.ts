import mongoose from "mongoose";
const Schema = mongoose.Schema;
import Joi from "joi";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 6)


const BlogSchemaJoi = Joi.object({
  title: Joi.string().min(10).max(20).required().messages({"string.min" : "Title must be at least 10 characters","string.max": "Title should be not more than 15 characters","any.required":"Title cannot be empty!"}),
  image: Joi.string().required().messages({"any.required":"Blog image cannot be empty!"}),
  description: Joi.string().min(35).required().messages({"string.min" : "Description must be at least 35 characters","any.required":"Description cannot be empty!"})
})
const BlogSchema = new Schema ({
  title: {
    type: String
  },
  author: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "user",
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },

},{timestamps: true})

const SubCategoryModel = mongoose.model('blogs',BlogSchema);
export {SubCategoryModel, BlogSchemaJoi};