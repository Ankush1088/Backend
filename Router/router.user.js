import express from "express";
import { Login, Logout, register, update } from "../Controller/user.controller.js";
import authentication from "../Middleware/isAuthenticated.js";
import { singleUpload } from "../Middleware/multer.js";
const router = express.Router(); 
router.route("/register").post((req, res, next) => {
  console.log("File Upload Middleware Running");
  next();
}, singleUpload, register);

//router.route("/register").post(singleUpload , register);
router.route("/login").post(Login); 
router.route("/Logout").post(Logout); 
router.route("/profile/update").post(authentication, update);  

export default router; 