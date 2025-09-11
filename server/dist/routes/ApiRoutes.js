import express from "express";
import DeliveryZoneController from "../controller/DeliveryZoneController.js";
import CategoryController from "../controller/CategoryController.js";
import SubCategoryController from "../controller/SubCategoryController.js";
import CategoryImageUpload from "../helper/CategoryImageUpload.js";
const ApiRouter = express.Router();
import { AuthCheck } from "../middleware/Auth.js";
//Delivery Zone
ApiRouter.post("/create-delivery-zone", AuthCheck, DeliveryZoneController.createDeliveryZone);
ApiRouter.get("/all-delivery-zone", AuthCheck, DeliveryZoneController.getAllDeliveryZones);
ApiRouter.get("/delivery-zone-details/:id", AuthCheck, DeliveryZoneController.getDeliveryZoneDetails);
ApiRouter.delete("/delete-delivery-zone/:id", AuthCheck, DeliveryZoneController.deleteDeliveryZone);
//Category Routes
ApiRouter.get("/all-category", AuthCheck, CategoryController.getAllCategory);
ApiRouter.post("/create-category", AuthCheck, CategoryController.createCategory);
ApiRouter.get("/category-details/:id", AuthCheck, CategoryController.getCategoryDetails);
ApiRouter.patch("/category-update/:id", AuthCheck, CategoryController.updateCategory);
ApiRouter.delete("/category-delete/:id", AuthCheck, CategoryController.deleteCategory);
//SubCategory Routes
ApiRouter.get("/all-sub-category", SubCategoryController.getAllSubCategory);
ApiRouter.post("/create-sub-category", CategoryImageUpload.single("image"), SubCategoryController.createSubCategory);
ApiRouter.get("/sub-category-details/:id", SubCategoryController.getSubCategoryDetails);
ApiRouter.patch("/update-sub-category/:id", CategoryImageUpload.single("image"), SubCategoryController.updateSubCategory);
ApiRouter.delete("/delete-sub-category/:id", SubCategoryController.deleteSubCategory);
export default ApiRouter;
//# sourceMappingURL=ApiRoutes.js.map