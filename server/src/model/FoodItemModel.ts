import mongoose from "mongoose";
const Schema = mongoose.Schema;
import Joi from "joi";

const FoodItemSchemaJoi = Joi.object({
  name: Joi.string().min(6).max(20).required().message('Name cannot be empty!'),
  price: Joi.string().required().message("Price is required"),
  image: Joi.string().required().message("Image is required!"),
  isAvailable: Joi.boolean(),
})
const FoodItemSchema = new Schema ({
  name: {
    type: String
  },
  restaurant: {
    type:mongoose.Schema.Types.ObjectId,
    ref: "restaurants",
    required: true,
  },
  category: {
    type:mongoose.Schema.Types.ObjectId,
    ref: "sub_category",
    required: true,
  },
  price: {
    type: String,
  },
  image: {
    type: String
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
},{timestamps: true})

const FoodItemModel = mongoose.model('food_items',FoodItemSchema);
export {FoodItemModel, FoodItemSchemaJoi};