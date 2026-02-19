import gemstoneModel from "../models/gemstone.model.js";
import materialModel from "../models/material.model.js";
import BaseController from "./base.controller.js";

class ItemController extends BaseController {
    getItems = async (req, res) => {
        try {
            const mats = await materialModel.find({ active: true });
            const gems = await gemstoneModel.find({ active: true });
            const data = [...mats, ...gems]
            return this.ok(res, data, "Lấy thành công")
        } catch (error) {
            return this.handleErr(res, error)
        }
    }
}
export default new ItemController()