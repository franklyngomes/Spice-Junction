import express from "express"
import cors from "cors"
import dotenv  from "dotenv"
dotenv.config()
import Database from "./config/config.js"

const app = express();
Database()
app.use(express.urlencoded())
app.use(express.json())
app.use(cors());

import AuthRouter from "./routes/AuthRoutes.js"
app.use(AuthRouter);

const port = 5000;
app.listen(port, async () => {
  console.log(`Server is running on http://localhost:5000`)
}) 