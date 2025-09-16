import express, { type Request, type Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import Database from "./config/config.js";
import { fileURLToPath } from "url";
import path from "path";
import * as swaggerui from "swagger-ui-express";
import fs from "fs";
import YAML from "yaml";
import Razorpay from "razorpay";

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
app.use(
  cors({
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void
    ) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
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
const swaggerFile = fs.readFileSync(
  path.join(__dirname, "./../swagger.yaml"),
  "utf-8"
);
const swaggerDocument = YAML.parse(swaggerFile);
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Spice Junction Api Doc",
      version: "1.0.0",
    },
    servers: [
      {
        url: "https://spice-junction-server.onrender.com",
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // files containing annotations as above
};
app.use("/api-doc", swaggerui.serve, swaggerui.setup(swaggerDocument));
//Swagger Configuration End


const port = 5000;
app.listen(port, async () => {
  console.log(`Server is running on http://localhost:5000`);
});
