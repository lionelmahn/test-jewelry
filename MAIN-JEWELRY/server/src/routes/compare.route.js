import express from "express"
import compareController from "../controller/compare.controller.js"
const route = express.Router()
route.get("/", compareController.getCompare)
route.post("/", compareController.createItemCompare)
route.delete("/:sku", compareController.deleteItemCompare)
route.delete("/", compareController.clearCompare)
export default route