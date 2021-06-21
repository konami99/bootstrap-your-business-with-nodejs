"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const emailService_1 = __importDefault(require("./emailService"));
const emailProviderMock = {
    send: jest.fn()
};
afterEach(() => {
    jest.clearAllMocks();
});
describe('EmailService', () => {
    it('calls send on email provider', async () => {
        const receiver = 'test@gmail.com';
        const emailService = new emailService_1.default(emailProviderMock);
        await emailService.send(receiver);
        expect(emailProviderMock.send).toHaveBeenCalledWith(receiver);
    });
});
