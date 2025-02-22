import express from "express";
import { Login, Logout, register, update } from "../Controller/user.controller.js";
import authentication from "../Middleware/isAuthenticated.js";

const router = express.Router(); 

router.route("/register").post(register);
router.route("/login").post(Login); 
router.route("/Logout").post(Logout); 
router.route("/profile/update").post(authentication, update);  

export default router;
  