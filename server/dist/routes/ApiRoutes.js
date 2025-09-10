import express from "express";
import DeliveryZoneController from "../controller/DeliveryZoneController.js";
const ApiRouter = express.Router();
//Delivery Zone
ApiRouter.post("/create-delivery-zone", DeliveryZoneController.createDeliveryZone);
ApiRouter.get("/all-delivery-zone", DeliveryZoneController.getAllDeliveryZones);
ApiRouter.get("/delivery-zone-details/:id", DeliveryZoneController.getDeliveryZoneDetails);
ApiRouter.delete("/delete-delivery-zone/:id", DeliveryZoneController.deleteDeliveryZone);
export default ApiRouter;
//# sourceMappingURL=ApiRoutes.js.map