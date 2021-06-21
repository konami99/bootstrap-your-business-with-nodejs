"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_resque_1 = require("node-resque");
class QueueService {
    static connectionDetails() {
        const REDIS_URL = process.env.REDIS_ENDPOINT || '127.0.0.1';
        return {
            pkg: "ioredis",
            host: REDIS_URL,
            password: null,
            port: process.env.REDIS_PORT || 6379,
            database: 0,
        };
    }
    static async enqueue(q, func, args) {
        const queue = this.getQueue();
        await queue.connect();
        await queue.enqueue(q, func, args);
    }
    static async endQueue() {
        await this.getQueue().end();
    }
    static getQueue() {
        if (QueueService.queue) {
            return QueueService.queue;
        }
        QueueService.queue = new node_resque_1.Queue({ connection: QueueService.connectionDetails() });
        return QueueService.queue;
    }
}
exports.default = QueueService;
