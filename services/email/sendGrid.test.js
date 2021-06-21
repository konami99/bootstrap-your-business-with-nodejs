"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mail_1 = __importDefault(require("@sendgrid/mail"));
const sendGrid_1 = __importDefault(require("./sendGrid"));
jest.mock('@sendgrid/mail');
afterEach(() => {
    jest.clearAllMocks();
});
describe('SendGrid', () => {
    it('calls send on sgMail', async () => {
        const sendGrid = new sendGrid_1.default();
        sendGrid.send('test@gmail.com');
        expect(mail_1.default.send).toHaveBeenCalled();
    });
});
