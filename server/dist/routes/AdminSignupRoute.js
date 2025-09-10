import express from "express";
import UserController from "../controller/UserController.js";
const AdminSignupRouter = express.Router();
AdminSignupRouter.post("/signup", UserController.adminSignup);
export default AdminSignupRouter;
//# sourceMappingURL=AdminSignupRoute.js.map