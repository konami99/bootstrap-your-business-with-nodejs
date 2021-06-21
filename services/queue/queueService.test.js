"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const queueService_1 = __importDefault(require("./queueService"));
// see https://jestjs.io/docs/en/es6-class-mocks#mocking-non-default-class-exports
const enqueueMock = jest.fn();
jest.mock('node-resque', () => {
    return {
        Queue: jest.fn().mockImplementation(() => {
            return {
                connect: jest.fn(),
                enqueue: enqueueMock,
                end: jest.fn()
            };
        }),
    };
});
afterEach(() => {
    jest.clearAllMocks();
});
describe('QueueService', () => {
    it('calls enqueue on Queue', async () => {
        await queueService_1.default.enqueue('queue1', 'sendEmail');
        expect(enqueueMock).toBeCalled();
    });
});
