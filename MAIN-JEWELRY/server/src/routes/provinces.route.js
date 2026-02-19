import express from "express";
import provincesController from "../controller/provinces.controller.js";
const route = express.Router();
route.get("/", provincesController.getProvinces)
route.get("/:province_code/communes", provincesController.getCommunes)
export default route;