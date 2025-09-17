import mongoose from "mongoose";
const Schema = mongoose.Schema;
import Joi from "joi";

const BlogSchemaJoi = Joi.object({
  title: Joi.string()
    .min(10)
    .max(50)
    .required()
    .messages({
      "string.min": "Title must be at least 10 characters",
      "string.max": "Title should be not more than 50 characters",
      "any.required": "Title cannot be empty!",
    }),
  image: Joi.string(),
  author: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    }, "Object Validation")
    .messages({
      "any.required": "Author is required!",
      "any.invalid": "Author must be valid object id!",
    }),
  description: Joi.string()
    .min(35)
    .required()
    .messages({
      "string.min": "Description must be at least 35 characters",
      "any.required": "Description cannot be empty!",
    }),
});
const BlogSchema = new Schema(
  {
    title: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const BlogModel = mongoose.model("blogs", BlogSchema);
export { BlogModel, BlogSchemaJoi };
