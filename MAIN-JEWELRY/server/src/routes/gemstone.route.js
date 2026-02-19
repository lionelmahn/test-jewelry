import express from "express";
import gemstoneController from "../controller/gemstone.controller.js";
import { checkRole } from "../auth/checkRole.js";

const route = express.Router();
route.get("/", checkRole("admin"), gemstoneController.getAllGemstones);
route.post("/", checkRole("admin"), gemstoneController.createGemstone);
route.put("/:id", checkRole("admin"), gemstoneController.updateGemstone);
route.delete("/:id", checkRole("admin"), gemstoneController.deleteGemstone);
export default route;
