import conversationModel from "../models/conversation.model.js"

class ConsercationService {
    async getAllMessage(page, limit) {
        const skip = (page - 1) * limit;
        const conversations = await conversationModel.aggregate([
            {
                $addFields: {
                    hasUnread: {
                        $gt: [
                            {
                                $size: {
                                    $filter: {
                                        input: "$messages",
                                        as: "msg",
                                        cond: {
                                            $and: [
                                                { $eq: ["$$msg.from", "customer"] },
                                                { $eq: ["$$msg.isReadByAdmin", false] }
                                            ]
                                        }
                                    }
                                }
                            },
                            0
                        ]
                    }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: {
                    path: "$user",
                    preserveNullAndEmptyArrays: true
                }
            },
            { $sort: { updatedAt: -1 } },
            { $skip: skip },
            { $limit: limit },
            {
                $project: {
                    messages: 1,
                    hasUnread: 1,
                    updatedAt: 1,
                    "user._id": 1,
                    "user.fullName": 1,
                    "user.avatar": 1,
                    "user.email": 1
                }
            }
        ]);

        const totalItems = await conversationModel.countDocuments();

        return {
            page,
            limit,
            totalItems,
            messages: conversations
        };
    }
    async getMessageId(userId) {
        if (!userId) {
            throw new BadRequest("Thiếu thông tin người dùng")
        }
        const mess = await conversationModel.findOne({ userId }).populate("userId")
        return mess
    }
    async hasUnread() {
        const exists = await conversationModel.exists({
            messages: {
                $elemMatch: {
                    from: "customer",
                    isReadByAdmin: false
                }
            }
        });
        return !!exists;
    }
    async markRead(roomId) {
        await conversationModel.updateOne(
            { roomId },
            {
                $set: {
                    "messages.$[msg].isReadByAdmin": true
                }
            },
            {
                arrayFilters: [
                    { "msg.from": "customer", "msg.isReadByAdmin": false }
                ]
            }
        );
    }
}
export default new ConsercationService()