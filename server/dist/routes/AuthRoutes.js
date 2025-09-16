import express from "express";
import UserController from "../controller/UserController.js";
const AuthRouter = express.Router();
AuthRouter.post("/signup", UserController.signup);
AuthRouter.get("/verify-email", UserController.verifyEmail);
AuthRouter.post("/signin", UserController.signin);
AuthRouter.post("/refresh-token", UserController.refreshToken);
AuthRouter.post("/forgot-password", UserController.forgotPassword);
AuthRouter.post("/reset-password", UserController.resetPassword);
AuthRouter.get("/user-profile/:id", UserController.userProfile);
AuthRouter.post("/set-user-address/:id", UserController.setUserAddress);
AuthRouter.delete("/delete-user-address/:id", UserController.deleteUserAddress);
export default AuthRouter;
//# sourceMappingURL=AuthRoutes.js.map