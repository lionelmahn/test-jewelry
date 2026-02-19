import brandService from "../services/brand.service.js";
import BaseController from "./base.controller.js";

class BrandController extends BaseController {
    getAllBrand = async (req, res) => {
        try {
            const page = Number(req.query.page || 1);
            const limit = Number(req.query.limit || 10);
            const search = req.query.search?.trim() || "";
            const data = await brandService.getAllBrand(page, limit, search);
            return this.ok(res, data, "Lấy thương hiệu thành công");
        } catch (err) {
            return this.handleErr(res, err);
        }
    };

    createBrand = async (req, res) => {
        try {
            const { name } = req.body;
            const data = await brandService.createBrand(name);
            return this.created(res, data, "Thêm thương hiệu thành công");
        } catch (err) {
            return this.handleErr(res, err);
        }
    };

    updateBrand = async (req, res) => {
        try {
            const { id } = req.params;
            const { name } = req.body;

            const data = await brandService.updateBrand(id, name);
            return this.ok(res, data, "Cập nhật thương hiệu thành công");
        } catch (err) {
            return this.handleErr(res, err);
        }
    };

    deleteBrand = async (req, res) => {
        try {
            const { id } = req.params;

            const data = await brandService.deleteBrand(id);
            return this.ok(res, data, "Xóa thương hiệu thành công");
        } catch (err) {
            return this.handleErr(res, err);
        }
    };
}

export default new BrandController();
