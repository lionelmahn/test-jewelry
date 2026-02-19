import { ZodError } from "zod";

export const middleware = (schema, type = "body") => {
    return (req, res, next) => {
        try {
            const data = type === "params" ? req.params : type === "body" ? req.body : req.query;
            const parsed = schema.parse(data);
            if (type === "body") req.body = parsed;
            if (type === "params") req.params = parsed;
            if (type === "query") req.query = parsed;
            return next();
        } catch (error) {
            console.log(error, "errorerrorerror")
            if (error instanceof ZodError) {
                return res.status(400).json({
                    message: "Validation failed",
                    errors: error.issues.map(e => ({
                        path: e.path.join("."),
                        msg: e.message
                    })),
                });
            }
            return res.status(400).json({ message: "Invalid request format" });
        }
    }
}