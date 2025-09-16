import mongoose from "mongoose";
const Schema = mongoose.Schema;
import Joi from "joi";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 6)

const PaymentSchemaJoi = Joi.object({
  amount: Joi.number().required().messages({"any.required":"Amount is required!"}),
  method: Joi.string(),
  date: Joi.date()
});
const PaymentSchema = new Schema(
  {
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
    },
    transactionId: {
      type: String,
      unique: true
    },
    date: {
      type: Date,
      default: Date.now()
    }
  },
  { timestamps: true }
);
PaymentSchema.pre("validate", async function (next){
  if(!this.transactionId){
    this.transactionId = `TXN-${nanoid()}`;
  }
})
const PaymentModel = mongoose.model("payments", PaymentSchema);
export { PaymentModel, PaymentSchemaJoi };
