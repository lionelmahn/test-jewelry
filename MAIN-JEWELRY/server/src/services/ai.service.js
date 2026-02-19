import { BadRequest } from "../core/error.response.js";
import aiModel from "../models/ai.model.js";

class AiService {
    async getAllMessage(limit, userId, cursor) {
        const query = { userId }
        if (cursor) {
            query.createdAt = { $lt: new Date(cursor) }
        }
        const messages = await aiModel
            .find(query)
            .sort({ createdAt: -1 })
            .limit(limit)
        return {
            messages: messages.reverse(),
            nextCursor: messages.length
                ? messages[messages.length - 1].createdAt
                : null,
            hasMore: messages.length === limit
        }
    }
    async createMessage({
        userId,
        role = "user",
        message,
        intent = null,
        entities = null,
        products = [],
    }) {
        if (!userId || !message) {
            throw new BadRequest("Thiếu thông tin");
        }
        return aiModel.create({
            userId,
            role,
            message,
            intent,
            entities,
            products
        });
    }
}

export default new AiService();