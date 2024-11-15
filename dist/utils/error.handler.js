"use strict";
// // utils/ErrorHandler.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
// export class ErrorHandler extends Error {
//     statusCode: number;
//     constructor(message: string, statusCode: number) {
//         super(message);
//         this.statusCode = statusCode;
//         Error.captureStackTrace(this, this.constructor);
//     }
// }
// src/utils/error.handler.ts
class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}
exports.ErrorHandler = ErrorHandler;
