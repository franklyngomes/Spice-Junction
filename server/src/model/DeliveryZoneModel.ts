import mongoose from "mongoose";
const Schema = mongoose.Schema;
import Joi from "joi";

const DeliveryZoneSchemaJoi = Joi.object({
  zoneName: Joi.string().min(5).max(20).required().messages({"any.required":"Zone name cannot be empty!"}),
  district: Joi.string().required().messages({"any.required":"District cannot be empty!"}),
  pinCodeList: Joi.array().items(Joi.string())
})
const DeliveryZoneSchema = new Schema ({
  zoneName: {
    type: String
  },
  district: {
    type: String
  },
  division: {
    type: String,
  },
  state: {
    type: String,
  },
  pinCodeList: [
    {
      type: String
    }
  ]
},{timestamps: true})


const DeliveryZoneModel = mongoose.model('delivery_zones',DeliveryZoneSchema);
export {DeliveryZoneModel, DeliveryZoneSchemaJoi};