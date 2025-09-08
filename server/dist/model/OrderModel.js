import mongoose from "mongoose";
const Schema = mongoose.Schema;
import Joi from "joi";
const OrderSchemaJoi = Joi.object({
    quantity: Joi.number(),
    street: Joi.string().min(8).max(20).required().message("Street is required!"),
    city: Joi.string().min(4).max(10).required().message("City is required"),
    pinCode: Joi.string()
        .min(6)
        .max(6)
        .required()
        .message("A valid pincode of 6 digit is required!"),
    discount: Joi.string().optional(),
});
const OrderSchema = new Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "restaurants",
        required: true,
    },
    quantity: {
        type: Number,
        default: 1,
    },
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
    },
    deliveryCharge: {
        type: Number,
        default: 14.5,
    },
    amount: {
        type: Number,
    },
    address: {
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
}, { timestamps: true });
const OrderModel = mongoose.model("orders", OrderSchema);
export { OrderModel, OrderSchemaJoi };
//# sourceMappingURL=OrderModel.js.map