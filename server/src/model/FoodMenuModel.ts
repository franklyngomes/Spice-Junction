import mongoose from "mongoose";
const Schema = mongoose.Schema;
import Joi from "joi";

const FoodMenuSchemaJoi = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    "string.min": "Name must be at least 3 characters",
    "string.max": "Name should be not more than 20 characters",
    "any.required": "Name cannot be empty!",
  }),
  restaurant: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    }, "Object Validation")
    .messages({
      "any.required": "Restaurant is required!",
      "any.invalid": "Restaurant must be valid object id!",
    }),
  items: Joi.array().items({
    name: Joi.string(),
    description: Joi.string(),
    subCategory: Joi.string(),
    price: Joi.number(),
    image: Joi.string(),
  }),
});
const FoodMenuSchema = new Schema(
  {
    name: {
      type: String,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "restaurants",
      required: true,
    },
    items: [
      {
        id: {
          type: String,
        },
        name: {
          type: String,
        },
        description: {
          type: String,
        },
        subCategory: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "sub_category",
        },
        price: {
          type: Number,
        },
        image: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const FoodMenuModel = mongoose.model("food_menus", FoodMenuSchema);
export { FoodMenuModel, FoodMenuSchemaJoi };
