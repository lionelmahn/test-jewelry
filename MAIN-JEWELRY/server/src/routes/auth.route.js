import express from "express";
import userController from "../controller/user.controller.js";
import { loginLimiter, refreshLimiter } from "../libs/rateLimit.js";
import { middleware } from "../middleware/middleware.js";
import { loginSchema, regiaterSchema } from "../Schema/auth.schema.js";
const route = express.Router();
route.post("/sign-up", middleware(regiaterSchema, "body"), loginLimiter, userController.register);
route.post('/sign-in-google', userController.loginGoogle)
route.post("/sign-in", middleware(loginSchema, "body"), loginLimiter, userController.loggin);
route.post("/refresh", refreshLimiter, userController.refreshToken);
export default route;