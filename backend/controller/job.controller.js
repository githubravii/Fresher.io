import { Job } from "../models/job.model.js";
//admin host
export const createJob = async (req,res) => {
    try {
        const {title, descripton, requirement, salary, location, jobType, experience, position, companyId} = req.body;
        const userId = req.id;
        
        if(!title || !descripton || !requirements || !salary || !location || !jobType || !experience || !position || !companyId){
            return res.status(400).json({
                message : "Something is missing",
                success : "false"
            })
        };
        const job = await JSON.create({
            title,
            descripton,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experiencelevel:experience,
            position,
            company:companyId,
            created_by:userId
        });
        return res.status(201).json({
            message:"New job created successfully.",
            job,
            success:true
        });
    }catch (error){
        console.log(error);
    }
}

//student

export const getAllJobs =  async (req,res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                {title:{$regex:keyword, $option:"i"}},
                {description:{$regex:keyword,$option:"i"}},
            ]
        };
        const jobs = await Job.find(query);
        if(!jobs){
            return res.status(404).json({
                message:"Job not found.",
                success:"false"
            })
        };
        return res.status(200).json({
            jobs,
            success:true
        })
    }catch (error) {
        console.log(error);
    }
}
export const getJobId = async (req,res) => {
    try {
        const jobs = req.params.id;
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message:"Jobs not found.",
                success:false
            })
        };
        return res.status(200).json({job,success:true});
    }catch (error) {
        console.log(error);
    }
}

//admin how much job create krna hai abhi tk
export const getAdminJobs = async (req,res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({create_by:adminId});
        if (!jobs){
            return res.status(404).json({
                message:"Jobs not found.",
                success:false
            })
        };
        return res.status(200).json({
            jobs,
            success:true
        })
    }catch (error) {
        console.log(error);
    }
}