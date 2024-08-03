import { application } from "express";
import mongoose, { Schema, trusted } from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
    required:true
    },
    requirementS:[{
       type:String
    }],
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    requirementS:[{
        type:String
    }],
    salary:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    jobType: {
        type:String,
        required: true
    },
    position:{
        type:String,
        required:true
    },
    company:{
        type:mongoose.Schema.type.ObjectID,
        ref:'Company',
        required:true
    },
    created_by:{
        type:mongoose.Schema.types.ObjectID,
        ref:'User',
        required:true
    },
    applications:[
        {
            type:mongoose.Schema.types.ObjectID,
            ref:'Application',
        }
    ]
},{timestamps:true});
export const Job = mongoose.model("Job",jobSchema);