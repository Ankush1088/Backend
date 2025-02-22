import express from "express";
import {
  getAdminJobs,
  postJob,
  getAllJobs,
  getJobById,
} from "../Controller/job.controller.js";
import authentication from "../Middleware/isAuthenticated.js";

const router = express.Router();

router.route("/post").post(authentication, postJob);
router.route("/get").get(authentication, getAllJobs);
router.route("/getadminjobs").get(authentication,getAdminJobs);
router.route("/get/:id").get(authentication, getJobById);

export default router;
