import express from "express";
import {
  applyJob ,
  getApplicants,
  getAppliedJobs,
  updateStatus ,
} from "../Controller/applications.controller.js";
import authentication from "../Middleware/isAuthenticated.js";

const router = express.Router();

router.route("/apply/:id").post(authentication, applyJob );
router.route("/get").get(authentication, getAppliedJobs);
router.route("/:id/applicants").get(authentication,getApplicants);
router.route("/status/:id/update").post(authentication,updateStatus );

export default router;
