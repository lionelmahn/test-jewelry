import express from "express"
import itemController from "../controller/item.controller.js"
import { checkRole } from "../auth/checkRole.js"
const route = express.Router()
route.get("/", checkRole("admin"), itemController.getItems)
export default route