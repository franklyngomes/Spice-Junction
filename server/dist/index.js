import express, {} from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import Database from "./config/config.js";
import { fileURLToPath } from "url";
import path from "path";
import * as swaggerui from "swagger-ui-express";
import fs from "fs";
import YAML from "yaml";
const app = express();
Database();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "views");
const allowedOrigins = [
    "https://spice-junction.onrender.com",
    "http://localhost:5173",
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:5000",
];
app.set("trust proxy", 1);
app.use(cors({
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../public")));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
import AuthRouter from "./routes/AuthRoutes.js";
app.use(AuthRouter);
import ApiRouter from "./routes/ApiRoutes.js";
app.use(ApiRouter);
import AdminSignupRouter from "./routes/AdminRoutes.js";
app.use("/admin", AdminSignupRouter);
import RestaurantSignupRouter from "./routes/RestaurantRoutes.js";
import { HttpCode } from "./helper/HttpCode.js";
app.use("/restaurant", RestaurantSignupRouter);
//Swagger Configuration Start
const swaggerFile = fs.readFileSync(path.join(__dirname, "./../swagger.yaml"), "utf-8");
const swaggerDocument = YAML.parse(swaggerFile);
app.use("/api-doc", swaggerui.serve, swaggerui.setup(swaggerDocument));
//Swagger Configuration End
const port = process.env.SERVER_PORT;
app.listen(port, async () => {
    console.log(`Server is running on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map