import mongoose from "mongoose";
const Schema = mongoose.Schema;
import Joi from "joi";

const RestaurantSchemaJoi = Joi.object({
  name: Joi.string().min(6).max(20).required().message('Name cannot be empty!'),
  street:Joi.string().min(8).max(20).required().message("Street is required!"),
  city: Joi.string().min(4).max(10).required().message("City is required"),
  pinCode: Joi.string().min(6).max(6).required().message("A valid pincode of 6 digit is required!"),
  phone: Joi.string().regex(/^d{10}$/).required().messages({'string.pattern.base': 'Valid phone number is required!','any.required': "Phone is required"}),
  logo: Joi.string().required().message("Logo is required!"),
  isActive: Joi.boolean(),
})
const RestaurantSchema = new Schema ({
  name: {
    type: String
  },
  ownerId: {
    type:mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  address: {
    street: {
      type:String,
    },
    city: {
      type: String,
    },
    pinCode: {
      type: String,
    }
  },
  phone: {
    type: String,
  },
  logo: {
    type: String
  },
  deliveryZone: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "delivery_zones"
  },
  isApproved: {
    type: Boolean,
    default: false
  }
},{timestamps: true})

const RestaurantModel = mongoose.model('restaurants',RestaurantSchema);
export {RestaurantModel, RestaurantSchemaJoi};