class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}
export class BadRequest extends ErrorResponse {
    constructor(message = "Bad Request") {
        super(message, 400);
    }
}
export class NotFound extends ErrorResponse {
    constructor(message = "Not Found") {
        super(message, 404)
    }
}
export class Unauthorized extends ErrorResponse {
    constructor(message = "Unauthorized") {
        super(message, 401)
    }
}
export class Forbidden extends ErrorResponse {
    constructor(message = "Forbidden") {
        super(message, 403);
    }
}
export class Conflict extends ErrorResponse {
    constructor(message = "Conflict") {
        super(message, 409);
    }
}
export class InternalError extends ErrorResponse {
    constructor(message = "Internal Server Error") {
        super(message, 500);
    }
}
