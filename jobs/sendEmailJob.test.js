"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sendEmailJob_1 = __importDefault(require("./sendEmailJob"));
const emailService_1 = __importDefault(require("../services/email/emailService"));
jest.mock('../services/email/emailService');
jest.mock('../services/email/sendGrid');
afterEach(() => {
    jest.clearAllMocks();
});
describe('SendEmailJob', () => {
    it('calls EmailService', async () => {
        const receiver = 'test@gmail.com';
        const sendMock = jest.fn();
        emailService_1.default.prototype.send = sendMock;
        await new sendEmailJob_1.default().perform(receiver);
        expect(sendMock).toHaveBeenCalledWith(receiver);
    });
});
