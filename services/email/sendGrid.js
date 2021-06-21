"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mail_1 = __importDefault(require("@sendgrid/mail"));
class SendGrid {
    async send(email) {
        mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: email,
            from: '',
            subject: 'Sending with SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        };
        await mail_1.default.send(msg);
    }
}
exports.default = SendGrid;
