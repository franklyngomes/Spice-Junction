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
import AggregationController from "../controller/AggregationController.js";
import OrderController from "../controller/OrderController.js";
import PaymentController from "../controller/PaymentController.js";
import BlogController from "../controller/BlogController.js";
import BlogImageUpload from "../helper/BlogImageUpload.js";
//Delivery Zone
ApiRouter.post("/create-delivery-zone", AuthCheck, DeliveryZoneController.createDeliveryZone);
ApiRouter.get("/all-delivery-zone", DeliveryZoneController.getAllDeliveryZones);
ApiRouter.get("/delivery-zone-details/:id", DeliveryZoneController.getDeliveryZoneDetails);
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
ApiRouter.get("/all-food-item", FoodItemController.getAllFoodItems);
ApiRouter.get("/restaurant-food-item/:id", FoodItemController.getRestaurantFoodItem),
    ApiRouter.post("/create-food-item", AuthCheck, CheckPermission(["create_food_item"]), FoodItemImageUpload.single("image"), FoodItemController.createFoodItem);
ApiRouter.get("/food-item-details/:id", FoodItemController.getFoodItemDetails);
ApiRouter.patch("/update-food-item/:id", AuthCheck, CheckPermission(["update_food_item"]), FoodItemImageUpload.single("image"), FoodItemController.updateFoodItem);
ApiRouter.delete("/delete-food-item/:id", AuthCheck, CheckPermission(["delete_food_item"]), FoodItemController.deleteFoodItem);
//Aggregation Routes
ApiRouter.post("/search", AggregationController.GlobalSearch);
ApiRouter.post("/sort-by-price", AggregationController.SortByPrice);
//Order Routes
ApiRouter.post("/create-order", AuthCheck, CheckPermission(["create_order"]), OrderController.createOrder);
ApiRouter.get("/all-order", AuthCheck, CheckPermission(["view_order"]), OrderController.getAllOrder);
ApiRouter.get("/order-details/:id", AuthCheck, CheckPermission(["view_order"]), OrderController.getOrderDetails);
ApiRouter.get("/order-by-customer/:id", AuthCheck, CheckPermission(["view_order"]), OrderController.getOrderByCustomer);
ApiRouter.get("/order-by-restaurant/:id", AuthCheck, CheckPermission(["view_order"]), OrderController.getOrderByRestaurant);
ApiRouter.patch("/order-update/:id", AuthCheck, CheckPermission(["update_order"]), OrderController.updateOrder);
ApiRouter.delete("/order-delete/:id", AuthCheck, CheckPermission(["delete_order"]), OrderController.deleteOrder);
//Payment Routes
ApiRouter.post("/create-payment", PaymentController.createPaymentOrder);
ApiRouter.post("/verify-payment", PaymentController.verifyPayment);
ApiRouter.post("/create-payment-record", PaymentController.createPaymentRecord);
//Blog Routes
ApiRouter.post("/create-blog", BlogImageUpload.single("image"), BlogController.createBlog);
ApiRouter.get("/all-blogs", BlogController.getAllBlog);
ApiRouter.get("/blogs-details/:id", BlogController.getBlogDetails);
ApiRouter.patch("/blog-update/:id", BlogImageUpload.single("image"), BlogController.updateBlog);
ApiRouter.delete("/blog-delete/:id", BlogController.deleteBlog);
export default ApiRouter;
//# sourceMappingURL=ApiRoutes.js.map