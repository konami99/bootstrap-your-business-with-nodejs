"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EmailService {
    constructor(emailProvider) {
        this.emailProvider = emailProvider;
    }
    async send(email) {
        this.emailProvider.send(email);
    }
}
exports.default = EmailService;
