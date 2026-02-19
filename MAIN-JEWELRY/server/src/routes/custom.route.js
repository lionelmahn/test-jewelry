import express from "express"
import customController from "../controller/custom.controller.js"
import { checkRole } from "../auth/checkRole.js"
const route = express.Router()
route.get("/", checkRole("admin"), customController.getCustom)
route.get("/user", customController.getCustomById)
route.post("/", customController.addCustom)
route.post("/calculate", customController.calcuate)
route.post("/preview/:id", customController.previewDesign)
route.put("/update/:id", customController.updateCustom)
route.put("/:id", checkRole("admin"), customController.updateStaus)
export default route