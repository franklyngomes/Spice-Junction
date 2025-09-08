import express from "express";
import UserController from "../controller/UserController.js";
const AuthRouter = express.Router();
AuthRouter.post("/signup", UserController.signup);
AuthRouter.get("/verify-email", UserController.verifyEmail);
AuthRouter.post("/signin", UserController.signin);
export default AuthRouter;
//# sourceMappingURL=AuthRoutes.js.map