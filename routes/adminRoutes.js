import express from "express";
import { loginAdmin, getAllUsers } from "../controllers/userController.js";
import authAdmin from "../middleware/adminMiddleware.js";

const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin);

adminRouter.get("/users", authAdmin, getAllUsers);

export default adminRouter;
