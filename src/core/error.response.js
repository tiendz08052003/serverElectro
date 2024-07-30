import { ReasonPhrases, StatusCodes } from "../utils/httpStatusCode.js"

class ErrorResponse extends Error {
    constructor(message, status) {
        super(message)
        this.status = status
        this.now = Date.now()
    }
} 

export class RedisErrorResponse extends ErrorResponse {
    constructor(message = ReasonPhrases.INTERNAL_SERVER_ERROR. statusCode = StatusCodes.INTERNAL_SERVER_ERROR) {
        super(message, statusCode)
    }
}