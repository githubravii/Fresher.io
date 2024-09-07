
import { Company } from "../models/company.model.js";

export const registerCompany = async (req, res) => {
    const { companyName } = req.body;

    if (!companyName) {
        return res.status(400).json({
            message: "Company name is required.",
            success: false
        });
    }

    let existingCompany = await company.findOne({ name: companyName });

    if (existingCompany) {
        return res.status(400).json({
            message: "You can't register the same company.",
            success: false
        });
    }

    try {
        const newCompany = await company.create({
            name: companyName,
            userId: req.userId // Assuming userId is available in req object
        });

        return res.status(201).json({
            message: "Company registered successfully",
            success: true,
            company: newCompany
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const getCompany = async (req, res) => {
    try {
        const userId = req.userId; // logged in user id
        const companies = await company.find({ userId });

        if (!companies || companies.length === 0) {
            return res.status(404).json({
                message: "Companies not found",
                success: false
            });
        }

        return res.status(200).json({
            companies,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            });
        }

        return res.status(200).json({
            company,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file; // Assuming you have middleware to handle file uploads

        // Assuming you are uploading the file to cloudinary or similar service
        // const uploadedFile = await cloudinary.uploader.upload(file.path);

        const updateData = { name, description, website, location };

        const updatedCompany = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!updatedCompany) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company information updated.",
            success: true,
            company: updatedCompany
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
