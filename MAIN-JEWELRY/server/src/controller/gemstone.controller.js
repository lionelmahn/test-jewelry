import gemstoneService from "../services/gemstone.service.js";
import BaseController from "./base.controller.js";


class GemstoneController extends BaseController {
    getAllGemstones = async (req, res) => {
        try {
            const page = Number(req?.query?.page) || 1;
            const limit = Number(req?.query?.limit) || 10;
            const search = req?.query?.search?.trim() || "";
            const data = await gemstoneService.getAllGemstones(page, limit, search);
            return this.ok(res, data, "Lấy danh sách đá quý thành công");
        } catch (error) {
            return this.handleErr(res, error);
        }
    }

    createGemstone = async (req, res) => {
        try {
            const { name, pricePerUnit, active } = req.body;
            const data = await gemstoneService.createGemstone(name, pricePerUnit, active);
            return this.created(res, data, "Tạo đá quý thành công");
        } catch (error) {
            return this.handleErr(res, error);
        }
    }

    updateGemstone = async (req, res) => {
        try {
            const { id } = req.params;
            const { name, pricePerUnit, active } = req.body;
            const data = await gemstoneService.updateGemstone(id, name, pricePerUnit, active);
            return this.ok(res, data, "Cập nhật đá quý thành công");
        } catch (error) {
            return this.handleErr(res, error);
        }
    }

    deleteGemstone = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await gemstoneService.deleteGemstone(id);
            return this.ok(res, data, "Xóa đá quý thành công");
        } catch (error) {
            return this.handleErr(res, error);
        }
    }
}

export default new GemstoneController();
