import express from "express"
import wishController from "../controller/wish.controller.js"
const route = express.Router()
route.get("/", wishController.getWish)
route.post("/", wishController.createWish)
route.delete("/:id", wishController.deleteWish)
export default route