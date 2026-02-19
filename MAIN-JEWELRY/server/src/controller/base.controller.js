class BaseController {
    ok(res, data = null, message = "Success") {
        return res.status(200).json({ message, data });
    }

    created(res, data = null, message = "Created successfully") {
        return res.status(201).json({ message, data });
    }

    badRequest(res, message = "Bad Request") {
        return res.status(400).json({ message });
    }

    unauthorized(res, message = "Unauthorized") {
        return res.status(401).json({ message });
    }

    forbidden(res, message = "Forbidden") {
        return res.status(403).json({ message });
    }

    notFound(res, message = "Not Found") {
        return res.status(404).json({ message });
    }

    conflict(res, message = "Conflict") {
        return res.status(409).json({ message });
    }

    unprocessable(res, message = "Unprocessable Entity") {
        return res.status(422).json({ message });
    }

    error(res, message = "Internal Server Error") {
        return res.status(500).json({ message });
    }
    handleErr(res, err) {
        const status = err.status || 500;
        return res.status(status).json({ message: err.message });
    }
}

export default BaseController;
