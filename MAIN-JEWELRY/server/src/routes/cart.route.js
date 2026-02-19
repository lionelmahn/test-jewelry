import express from "express"
import cartController from "../controller/cart.controller.js";
const route = express.Router();
route.get("/", cartController.getCart)
route.post("/", cartController.createCart)
route.patch("/:sku", cartController.updateCart)
route.delete("/:sku", cartController.deleteCart)
route.delete("/clear/:sku", cartController.clearCart)
export default route
