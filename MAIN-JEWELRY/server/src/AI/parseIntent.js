import openai from "../config/openai.js";

const SYSTEM_PROMPT = `
Bạn là AI phân tích câu hỏi khách hàng cho website bán trang sức.

NHIỆM VỤ:
- Hiểu câu hỏi tiếng Việt (có thể thiếu dấu, sai chính tả)
- Phân loại intent phù hợp nhất

CÁC INTENT HỢP LỆ:
- SEARCH_PRODUCT
- CHECK_ORDER_STATUS
- ASK_PAYMENT
- ASK_SHIPPING
- ASK_PROMOTION
- GREETING
- GOODBYE
- UNKNOWN

QUY TẮC:
- CHỈ trả JSON, không thêm chữ
- intent: bắt buộc (1 trong list)
- entities: LUÔN có đủ key
- Nếu không có thông tin thì trả null
`;

export async function parseIntent(message) {
    const res = await openai.responses.create({
        model: "gpt-4o-mini",
        input: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: message },
        ],
        temperature: 0,
        text: {
            format: {
                type: "json_schema",
                name: "intent_parser",
                schema: {
                    type: "object",
                    properties: {
                        intent: {
                            type: "string",
                            enum: [
                                "SEARCH_PRODUCT",
                                "CHECK_ORDER_STATUS",
                                "ASK_PAYMENT",
                                "ASK_SHIPPING",
                                "ASK_CATEGORY",
                                "ASK_SUBCATEGORY",
                                "ASK_MATERIAL_PRICE",
                                "GREETING",
                                "GOODBYE",
                                "UNKNOWN",
                            ],
                        },
                        entities: {
                            type: "object",
                            properties: {
                                category: { type: ["string", "null"] },
                                subcategory: { type: ["string", "null"] },
                                material: { type: ["string", "null"] },
                                priceMax: { type: ["number", "null"] },
                            },
                            required: ["category", "subcategory", "material", "priceMax"],
                            additionalProperties: false,
                        },
                    },
                    required: ["intent", "entities"],
                    additionalProperties: false,
                },
            },
        },
    });
    if (res.output_parsed) {
        return res.output_parsed;
    }
    const rawText = res.output_text;

    try {
        const parsed = JSON.parse(rawText);
        return {
            intent: parsed.intent ?? "UNKNOWN",
            entities: {
                category: parsed.entities?.category ?? null,
                subcategory: parsed.entities?.subcategory ?? null,
                material: parsed.entities?.material ?? null,
                priceMax: parsed.entities?.priceMax ?? null
            },
        };
    } catch (err) {
        return {
            intent: "UNKNOWN",
            entities: {
                category: null,
                subcategory: null,
                material: null,
                priceMax: null
            },
        };
    }
}