"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_resque_1 = require("node-resque");
const sendEmailJob_1 = __importDefault(require("./jobs/sendEmailJob"));
const queueService_1 = __importDefault(require("./services/queue/queueService"));
class JobWrapper {
    static wrap(proxy) {
        return {
            perform: async (...args) => {
                return await proxy.perform.apply(proxy, args);
            }
        };
    }
}
async function start() {
    const jobs = {
        send: JobWrapper.wrap(new sendEmailJob_1.default()),
    };
    const multiWorker = new node_resque_1.MultiWorker({
        connection: queueService_1.default.connectionDetails(),
        queues: ['email'],
        minTaskProcessors: 1,
        maxTaskProcessors: 100,
        checkTimeout: 1000,
        maxEventLoopDelay: 10,
    }, jobs);
    const scheduler = new node_resque_1.Scheduler({ connection: queueService_1.default.connectionDetails() });
    multiWorker.start();
    await scheduler.connect();
    scheduler.start();
    async function shutdown() {
        console.log('shutting down...');
        await queueService_1.default.endQueue();
        await scheduler.end();
        await multiWorker.end();
    }
    process.on('SIGTERM', async () => {
        await shutdown();
    });
    process.on('SIGINT', async () => {
        await shutdown();
    });
}
start();
