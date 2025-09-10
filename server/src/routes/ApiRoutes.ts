import express from "express";
import DeliveryZoneController from "../controller/DeliveryZoneController.js";
const ApiRouter = express.Router()
import { AuthCheck } from "../middleware/Auth.js";

//Delivery Zone
ApiRouter.post("/create-delivery-zone",AuthCheck, DeliveryZoneController.createDeliveryZone)
ApiRouter.get("/all-delivery-zone",AuthCheck, DeliveryZoneController.getAllDeliveryZones)
ApiRouter.get("/delivery-zone-details/:id",AuthCheck, DeliveryZoneController.getDeliveryZoneDetails)
ApiRouter.delete("/delete-delivery-zone/:id",AuthCheck, DeliveryZoneController.deleteDeliveryZone)

export default ApiRouter