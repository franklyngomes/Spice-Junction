import express from "express";
import UserController from "../controller/UserController.js";
const AdminRouter = express.Router();
import { AuthCheck } from "../middleware/Auth.js";
import CheckPermission from "../middleware/CheckPermission.js";
AdminRouter.post("/signup", UserController.adminSignup);
AdminRouter.get("/get-restaurant-request", AuthCheck, CheckPermission(["view_restaurant_request"]), UserController.restaurantRequests);
AdminRouter.patch("/respond-restaurant-request/:id", AuthCheck, CheckPermission(["update_restaurant"]), UserController.responseRestaurantRequest);
export default AdminRouter;
//# sourceMappingURL=AdminRoutes.js.map