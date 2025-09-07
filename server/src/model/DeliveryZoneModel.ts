import mongoose from "mongoose";
const Schema = mongoose.Schema;
import Joi from "joi";


const DeliveryZoneSchemaJoi = Joi.object({
  zoneName: Joi.string().min(5).max(20).required().message('Zone name is required!'),
  city: Joi.string().required().message("City name is required!"),
  pinCodeList: Joi.array().items(Joi.string())
})
const DeliveryZoneSchema = new Schema ({
  zoneName: {
    type: String
  },
  city: {
    type: String
  },
  pinCodeList: [
    {
      type: String
    }
  ]
},{timestamps: true})


const DeliveryZoneModel = mongoose.model('delivery_zones',DeliveryZoneSchema);
export {DeliveryZoneModel, DeliveryZoneSchemaJoi};