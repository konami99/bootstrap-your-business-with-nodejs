"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const emailService_1 = __importDefault(require("../services/email/emailService"));
const sendGrid_1 = __importDefault(require("../services/email/sendGrid"));
class SendEmailJob {
    async perform(...args) {
        const sendGrid = new sendGrid_1.default();
        const emailService = new emailService_1.default(sendGrid);
        await emailService.send(args[0]);
    }
}
exports.default = SendEmailJob;
