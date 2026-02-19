import materialService from "../services/material.service.js";
import BaseController from "./base.controller.js";

class MaterialController extends BaseController {
    getAllMaterial = async (req, res) => {
        try {
            const page = Number(req?.query?.page) || 1;
            const limit = Number(req?.query?.limit) || 10;
            const search = req?.query?.search?.trim() || "";
            const data = await materialService.getAllMaterial(page, limit, search)
            return this.ok(res, data, "Lấy thành công")
        } catch (error) {
            return this.handleErr(res, error)
        }
    }
    createMaterial = async (req, res) => {
        try {
            const { name, purity, pricePerUnit, active } = req.body
            const data = await materialService.createMaterial(name, purity, pricePerUnit, active)
            return this.created(res, data, "Tạo chất liệu thành công")
        } catch (error) {
            return this.handleErr(res, error)
        }
    }
    updateMaterial = async (req, res) => {
        try {
            const { id } = req.params;
            const { name, purity, pricePerUnit, active } = req.body
            const data = await materialService.updateMaterial(id, name, purity, pricePerUnit, active)
            return this.ok(res, data, "Cập nhật chất liệu thành công")
        } catch (error) {
            return this.handleErr(res, error)
        }
    }
    deleteMaterial = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await materialService.deleteMaterial(id)
            return this.ok(res, data, "Xóa chất liệu thành công")
        } catch (error) {
            return this.handleErr(res, error)
        }
    }
}
export default new MaterialController()