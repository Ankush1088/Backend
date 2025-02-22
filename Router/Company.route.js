import express from "express";
import {
  registerCompany,
  getCompanyById,
  getAllCompany,
  updateCompany,
} from "../Controller/compony.controler.js";

import authentication from "../Middleware/isAuthenticated.js";

const router = express.Router();

router.route("/registerCompany").post(authentication,registerCompany);
router.route("/get").get(authentication,getAllCompany);
router.route("/get/:id").get(authentication,getCompanyById);
router.route("/update/:id").put(authentication,updateCompany);

export default router;
