import mongoose from "mongoose";
const Schema = mongoose.Schema;
import Joi from "joi";

const RoleOptions = {
  "customer": "customer",
  "admin": "admin",
  "restaurant": "restaurant"
}
const UserSchemaJoi = Joi.object({
  name: Joi.string().min(6).max(20).required().message('Name cannot be empty!'),
  email: Joi.string().email().required().message('Email is required!'),
  password: Joi.string().required().message("Password is required!"),
  role: Joi.string().valid(...Object.values(RoleOptions)).required().message("Role is required!"),
  street:Joi.string().min(8).max(20).required().message("Street is required!"),
  city: Joi.string().min(4).max(10).required().message("City is required"),
  pinCode: Joi.string().min(6).max(6).required().message("A valid pincode of 6 digit is required!"),
  phone: Joi.string().regex(/^d{10}$/).required().messages({'string.pattern.base': 'Valid phone number is required!','any.required': "Phone is required"})
})
const UserSchema = new Schema ({
  name: {
    type: String
  },
  email: {
    type:String,
  },
  password: {
    type: String
  },
  role: {
    default: "customer",             
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
  }
},{timestamps: true})

const UserModel = mongoose.model('users',UserSchema);
export {UserModel, UserSchemaJoi};