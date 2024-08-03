import mongoose from "mongoose";
//import { Job } from "./job.model";
//import mongoose from "mongoose";
//import { application } from "express";

const applicationSchema = new mongoose.sechema(
  {
    Job: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timeseries: true }
);
export const Application = mongoose.model("Application", applicationSchema);
