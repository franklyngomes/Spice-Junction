import express from "express";
import UserController from "../controller/UserController.js";
const RestaurantSignupRouter = express.Router();
RestaurantSignupRouter.post("/signup", UserController.restaurantSignup);
export default RestaurantSignupRouter;
//# sourceMappingURL=RestaurantSignupRoute.js.map