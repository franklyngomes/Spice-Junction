import mongoose from "mongoose";
const Schema = mongoose.Schema;
import Joi from "joi";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 6);
const MethodOptions = {
    "COD": "COD",
    "card": "card",
    "upi": "upi"
};
const PaymentSchemaJoi = Joi.object({
    amount: Joi.number().required().message("Amount is required!"),
    method: Joi.string().valid(...Object.values(MethodOptions)),
    date: Joi.date().required().message("Transaction date is required!")
});
const PaymentSchema = new Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "orders",
        required: true,
    },
    amount: {
        type: Number,
    },
    status: {
        type: String,
        enum: ["success", "pending", "failed"],
        default: "pending",
    },
    method: {
        type: String,
        enum: ["COD", "card", "upi"],
    },
    transactionId: {
        type: String,
        default: () => nanoid(),
        unique: true
    },
    date: {
        type: Date,
    }
}, { timestamps: true });
PaymentSchema.pre("validate", async function (next) {
    if (!this.transactionId) {
        this.transactionId = `TXN${nanoid()}`;
    }
});
const PaymentModel = mongoose.model("payments", PaymentSchema);
export { PaymentModel, PaymentSchemaJoi };
//# sourceMappingURL=PaymentModel.js.map