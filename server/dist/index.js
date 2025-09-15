import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import Database from "./config/config.js";
import { fileURLToPath } from "url";
import path from "path";
import swaggerJSDoc from "swagger-jsdoc";
import * as swaggerui from "swagger-ui-express";
const app = express();
Database();
app.use(express.urlencoded());
app.use(express.json());
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://localhost:5000",
];
app.set("trust proxy", 1);
app.use(cors({
    origin: function (origin, callback) {
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
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
app.use("/restaurant", RestaurantSignupRouter);
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Spice Junction Api Doc',
            version: '1.0.0',
        },
        servers: [
            {
                url: ""
            }
        ]
    },
    apis: ['./src/routes*.js'], // files containing annotations as above
};
const openapiSpecification = swaggerJSDoc(options);
app.use("/api-doc", swaggerui.serve);
const port = 5000;
app.listen(port, async () => {
    console.log(`Server is running on http://localhost:5000`);
});
//# sourceMappingURL=index.js.map