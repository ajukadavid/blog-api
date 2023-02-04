import morgan from "morgan";
import cors from "cors";
import express from "express";
import { v2 as cloudinary } from "cloudinary";
import {
  createNewUser,
  getAllUsers,
  getUserDetails,
  signInUser,
} from "./handlers/user";
import { protect } from "./services/auth-service";
import router from "./router";
import multer from "multer";
import { body, oneOf, validationResult } from "express-validator";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const app = express();
cloudinary.config({
  secure: true,
});

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post("/signUp", body('email').isEmail(), upload.single("image"), createNewUser);
app.post("/signIn", body('username').exists(), body('password').exists, signInUser);
app.get("/users", getAllUsers);
app.get("/viewUser", getUserDetails);
app.use("/api", protect, router);
app.get('/', (req, res) => {
    res.json({data: 'home route'})
})
export default app;
