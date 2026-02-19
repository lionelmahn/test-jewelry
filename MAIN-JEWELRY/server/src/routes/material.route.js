import express from "express"
import materialController from "../controller/material.controller.js"
import { checkRole } from "../auth/checkRole.js"
const route = express.Router()
route.get("/", checkRole("admin"), materialController.getAllMaterial)
route.post("/", checkRole("admin"), materialController.createMaterial)
route.put("/:id", checkRole("admin"), materialController.updateMaterial)
route.delete("/:id", checkRole("admin"), materialController.deleteMaterial)
export default route