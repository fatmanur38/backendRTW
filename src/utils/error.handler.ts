// // utils/ErrorHandler.ts

// export class ErrorHandler extends Error {
//     statusCode: number;

//     constructor(message: string, statusCode: number) {
//         super(message);
//         this.statusCode = statusCode;
//         Error.captureStackTrace(this, this.constructor);
//     }
// }

// src/utils/error.handler.ts

export class ErrorHandler extends Error {
    public statusCode: number;
  
    constructor(statusCode: number, message: string) {
      super();
      this.statusCode = statusCode;
      this.message = message;
    }
  }
  