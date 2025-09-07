import mongoose from "mongoose";
const Schema = mongoose.Schema;
import Joi from "joi";

const FoodMenuSchemaJoi = Joi.object({
  name: Joi.string().min(6).max(20).required().message('Name cannot be empty!'),
})
const FoodMenuSchema = new Schema ({
  name: {
    type: String
  },
  restaurant: {
    type:mongoose.Schema.Types.ObjectId,
    ref: "restaurants",
    required: true,
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "food_items",
      required: true
    }
  ]
},{timestamps: true})

const FoodMenuModel = mongoose.model('food_menus',FoodMenuSchema);
export {FoodMenuModel, FoodMenuSchemaJoi};