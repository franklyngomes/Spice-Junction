import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import Database from "./config/config.js";
import { fileURLToPath } from "url";
import path from "path";
const app = express();
Database();
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../public")));
import AuthRouter from "./routes/AuthRoutes.js";
app.use(AuthRouter);
import ApiRouter from "./routes/ApiRoutes.js";
app.use(ApiRouter);
import AdminSignupRouter from "./routes/AdminSignupRoute.js";
app.use("/admin", AdminSignupRouter);
import RestaurantSignupRouter from "./routes/RestaurantSignupRoute.js";
app.use("/restaurant", RestaurantSignupRouter);
const port = 5000;
app.listen(port, async () => {
    console.log(`Server is running on http://localhost:5000`);
});
//# sourceMappingURL=index.js.map