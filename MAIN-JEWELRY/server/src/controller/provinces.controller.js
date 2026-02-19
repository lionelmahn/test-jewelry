import axios from "axios";
import BaseController from "./base.controller.js";
class ProvincesController extends BaseController {
    getProvinces = async (req, res) => {
        try {
            const response = await axios.get("https://production.cas.so/address-kit/2025-07-01/provinces", { withCredentials: true });
            return this.ok(res, response.data, "Lấy danh sách tỉnh/thành phố thành công");
        } catch (error) {
            return this.handleErr(res, error);
        }
    }
    getCommunes = async (req, res) => {
        try {
            const response = await axios.get(`https://production.cas.so/address-kit/2025-07-01/provinces/${req.params.province_code}/communes`, { withCredentials: true });
            return this.ok(res, response.data, "Lấy danh sách xã/thị trấn thành công");
        } catch (error) {
            return this.handleErr(res, error);
        }
    }
}
export default new ProvincesController();