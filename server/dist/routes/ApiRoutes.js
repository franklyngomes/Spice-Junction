import express from "express";
import DeliveryZoneController from "../controller/DeliveryZoneController.js";
import CategoryController from "../controller/CategoryController.js";
import SubCategoryController from "../controller/SubCategoryController.js";
import CategoryImageUpload from "../helper/CategoryImageUpload.js";
const ApiRouter = express.Router();
import { AuthCheck } from "../middleware/Auth.js";
import RestaurantController from "../controller/RestaurantController.js";
import RestaurantImageUpload from "../helper/RestaurantImageUpload.js";
import FoodMenuController from "../controller/FoodMenuController.js";
import FoodItemController from "../controller/FoodItemController.js";
import CheckPermission from "../middleware/CheckPermission.js";
import FoodItemImageUpload from "../helper/FoodItemImageUpload.js";
//Delivery Zone
ApiRouter.post("/create-delivery-zone", AuthCheck, DeliveryZoneController.createDeliveryZone);
ApiRouter.get("/all-delivery-zone", DeliveryZoneController.getAllDeliveryZones);
ApiRouter.get("/delivery-zone-details/:id", AuthCheck, DeliveryZoneController.getDeliveryZoneDetails);
ApiRouter.delete("/delete-delivery-zone/:id", AuthCheck, DeliveryZoneController.deleteDeliveryZone);
//Category Routes
ApiRouter.get("/all-category", CategoryController.getAllCategory);
ApiRouter.post("/create-category", AuthCheck, CategoryController.createCategory);
ApiRouter.get("/category-details/:id", CategoryController.getCategoryDetails);
ApiRouter.patch("/category-update/:id", AuthCheck, CategoryController.updateCategory);
ApiRouter.delete("/category-delete/:id", AuthCheck, CategoryController.deleteCategory);
//SubCategory Routes
ApiRouter.get("/all-sub-category", SubCategoryController.getAllSubCategory);
ApiRouter.post("/create-sub-category", CategoryImageUpload.single("image"), SubCategoryController.createSubCategory);
ApiRouter.get("/sub-category-details/:id", SubCategoryController.getSubCategoryDetails);
ApiRouter.patch("/update-sub-category/:id", CategoryImageUpload.single("image"), SubCategoryController.updateSubCategory);
ApiRouter.delete("/delete-sub-category/:id", SubCategoryController.deleteSubCategory);
//Restaurant Routes
ApiRouter.get("/all-restaurant", RestaurantController.getAllRestaurant),
    ApiRouter.post("/create-restaurant", AuthCheck, CheckPermission(["create_restaurant"]), RestaurantImageUpload.single("image"), RestaurantController.createRestaurant);
ApiRouter.get("/restaurant-details/:id", RestaurantController.getRestaurantDetails);
ApiRouter.patch("/update-restaurant/:id", AuthCheck, CheckPermission(["update_restaurant"]), RestaurantImageUpload.single("image"), RestaurantController.updateRestaurant);
ApiRouter.delete("/delete-restaurant/:id", AuthCheck, CheckPermission(["delete_restaurant"]), RestaurantController.deleteRestaurant);
//Food Menu Routes
ApiRouter.get("/all-food-menu", FoodMenuController.getAllFoodMenu),
    ApiRouter.post("/create-food-menu", AuthCheck, CheckPermission(["create_menu"]), FoodMenuController.createFoodMenu);
ApiRouter.get("/food-menu-details/:id", FoodMenuController.getFoodMenuDetails);
ApiRouter.patch("/update-food-menu/:id", AuthCheck, CheckPermission(["update_menu"]), FoodMenuController.updateFoodMenu);
ApiRouter.delete("/delete-food-menu/:id", AuthCheck, CheckPermission(["delete_menu"]), FoodMenuController.deleteFoodMenu);
//Food Item Routes
ApiRouter.get("/restaurant-food-item/:id", FoodItemController.getRestaurantFoodItem),
    ApiRouter.post("/create-food-item", AuthCheck, CheckPermission(["create_food_item"]), FoodItemImageUpload.single("image"), FoodItemController.createFoodItem);
ApiRouter.get("/food-item-details/:id", FoodItemController.getFoodItemDetails);
ApiRouter.patch("/update-food-item/:id", AuthCheck, CheckPermission(["update_food_item"]), FoodItemImageUpload.single("image"), FoodItemController.updateFoodItem);
ApiRouter.delete("/delete-food-item/:id", AuthCheck, CheckPermission(["delete_food_item"]), FoodItemController.deleteFoodItem);
export default ApiRouter;
//# sourceMappingURL=ApiRoutes.js.map