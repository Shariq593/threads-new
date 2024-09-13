import  express  from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import userRoutes from "./Routes/userRoutes.js"
import connectDB from "./db/connectDB.js";
import postRoutes from "./Routes/postRoutes.js"
import {v2 as cloudinary} from "cloudinary"
import cors from "cors";



dotenv.config() //to read the env file
connectDB();

const app = express();
const PORT = process.env.PORT || 4000

app(
  cors({
    origin:
      process.env.ENVIRONMENT === "Local"
        ? "http://localhost:3000"
        : process.env.FRONTEND_URL,
  })
);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

//MiddleWare
app.use(express.json({limit: "50mb"})) //to parse json data in the req.body
app.use(express.urlencoded({extended:true})) // To parse form data in the req body.
                            //extended is used to parse nested data

app.use(cookieParser())

//Routes
app.use("/api/users",userRoutes)
app.use("/api/posts",postRoutes)

app.listen(5000, ()=> console.log(`Server Started at http://localhost:${PORT}`));       