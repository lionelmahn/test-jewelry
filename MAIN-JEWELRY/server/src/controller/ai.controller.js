import aiService from "../services/ai.service"
import BaseController from "./base.controller";

class AiController extends BaseController {
    createMessage = async (req, res) => {
        try {
            const { message } = req.body
            const userId = req.user.id;
            const data = await aiService.createMessage(message, userId)
            return this.ok(res, data, "Gửi thành công")
        } catch (error) {
            return this.handleErr(res, error);
        }
    }
}
export default new AiController()