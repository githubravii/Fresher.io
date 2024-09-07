import { Router } from "express";
import isAuthenticated from "../models/isauth.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "./company.controller.js";

const authRouter = Router();

authRouter.post("/register", isAuthenticated, registerCompany);
authRouter.get("/", isAuthenticated, getCompany);
authRouter.get("/:id", isAuthenticated, getCompanyById);
authRouter.put("/:id", isAuthenticated, updateCompany);

export default authRouter;
