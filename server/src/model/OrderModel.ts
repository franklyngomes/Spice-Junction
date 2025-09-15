import mongoose from "mongoose";
const Schema = mongoose.Schema;
import Joi from "joi";

const OrderSchemaJoi = Joi.object({
  customerId: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    }, "Object Validation")
    .messages({
      "any.required": "Customer id is required!",
      "any.invalid": "Customer id must be valid object id!",
    }),
  restaurant: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    }, "Object Validation")
    .messages({
      "any.invalid": "Restaurant must be valid object id!",
    }),
  items: Joi.array().items({
    foodItem: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.error("any.invalid");
        }
        return value;
      }, "Object Validation")
      .messages({
        "any.required": "Menu is required!",
        "any.invalid": "Menu must be valid object id!",
      }),
    quantity: Joi.number(),
  }),
  buildingNo: Joi.string().min(3).max(40).messages({
    "string.min": "Building no. must be at least 3 characters",
    "string.max": "Building no. must be at most 40 characters",
  }),
  street: Joi.string().min(8).max(40).messages({
    "string.min": "Street must be at least 8 characters",
    "string.max": "Street must be at most 40 characters",
  }),
  city: Joi.string().min(4).max(10).messages({
    "string.min": "City must be at least 4 characters",
    "string.max": "City must be at most 10 characters",
  }),
  pinCode: Joi.string().min(6).max(6).messages({
    "string.min": "Pin code must be exactly 6 characters",
    "string.max": "Pin code must be exactly 6 characters",
  }),
  discount: Joi.string().optional(),
});
const OrderSchema = new Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "restaurant",
    },
    items: [
      {
        foodItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "food_items",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    tax: {
      packaging: {
        type: Number,
        default: 15,
      },
      restaurantGST: {
        type: Number,
        default: 14.75,
      },
      platform: {
        type: Number,
        default: 14.99,
      },
    },
    discount: {
      type: Number,
      default: 0,
    },
    deliveryCharge: {
      type: Number,
      default: 14.5,
    },
    amount: {
      type: Number,
    },
    address: {
      buildingNo: {
        type: String,
      },
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      pinCode: {
        type: String,
      },
    },
    status: {
      type: String,
      enum: ["pending", "preparing", "out_for_delivery", "delivered"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("orders", OrderSchema);
export { OrderModel, OrderSchemaJoi };
