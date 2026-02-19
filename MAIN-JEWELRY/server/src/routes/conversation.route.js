import express from "express"
import conservationController from "../controller/conservation.controller.js"
const route = express.Router()
route.get("/", conservationController.getAllMessgae)
route.get("/me", conservationController.getMessageById)
route.get("/hasunread", conservationController.hasUnread)
route.get("/markread", conservationController.markRead)
export default route