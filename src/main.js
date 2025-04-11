import express from "express";
import dotenv from "dotenv";

import { mongoConnection } from "./db/index.js";

mongoConnection()
dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));