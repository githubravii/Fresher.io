import express from "express";
import isAuthenticated from "../models/isauth.js";
import { getAdminJobs, getAllJobs } from "../controller/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/getadminjobs").post(isAuthenticated, getAdminJobs);
router.route("/:id").post(isAuthenticated, postJob);

export default router;