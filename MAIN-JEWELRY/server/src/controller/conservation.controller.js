
import conservationService from "../services/conservation.service.js";
import BaseController from "./base.controller.js";

class ConservationController extends BaseController {
    getAllMessgae = async (req, res) => {
        try {
            const page = Number(req?.query?.page) || 1;
            const limit = Number(req?.query?.limit) || 10;
            const messages = await conservationService.getAllMessage(page, limit)
            return this.ok(res, messages, "Lấy tin nhắn thành công")
        } catch (error) {
            return this.handleErr(res, error)
        }
    }
    getMessageById = async (req, res) => {
        try {
            const userId = req.user.id
            const messById = await conservationService.getMessageId(userId)
            return this.ok(res, messById, "Lấy tin nhắn thành công")
        } catch (error) {
            return this.handleErr(res, error)
        }
    }
    hasUnread = async (req, res) => {
        try {
            const hasUnread = await conservationService.hasUnread();
            return this.ok(res, { hasUnread });
        } catch (e) {
            return this.handleErr(res, e);
        }
    };

    markRead = async (req, res) => {
        try {
            const { roomId } = req.params;
            await conservationService.markRead(roomId);
            return this.ok(res);
        } catch (e) {
            return this.handleErr(res, e);
        }
    };

}
export default new ConservationController()