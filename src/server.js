import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from "./config/connectDB.js";
import { userRoutes, authRoutes } from "./routes/index.js";
dotenv.config();
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
//connect to mongoose
app.use(express.json());
// app.use(express.urlencoded({ extended: false }))
const uri = process.env.URI_MONGOOSE;
connectDB(uri);
//Routes

userRoutes(app);
authRoutes(app);

const PORT = process.env.PORT;
app.listen(PORT || 5000, () => {
  console.log("Server is running on", PORT);
});
