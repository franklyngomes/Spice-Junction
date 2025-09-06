import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import Database from "./config/config.js";
const app = express();
app.use(dotenv.config);
Database();
app.use(express.urlencoded());
app.use(express.json());
app.use(bodyParser);
app.use(cors());
app.get("/health", (req, res) => {
    res.json({ status: true });
});
const port = 5000;
app.listen(port, async () => {
    console.log(`Server is running on http://localhost:5000`);
});
//# sourceMappingURL=index.js.map