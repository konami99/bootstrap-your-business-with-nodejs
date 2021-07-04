import { Queue } from 'node-resque';

export default class QueueService {
  private static queue: Queue;

  public static connectionDetails() {
    const REDIS_URL = process.env.REDIS_ENDPOINT || '127.0.0.1';

    return {
      pkg: "ioredis",
      host: REDIS_URL,
      password: null,
      port: process.env.REDIS_PORT || 6379,
      database: 0,
    }
  }

  public static async enqueue(q: string, func: string, args?: any[] | undefined): Promise<any> {
    const queue = this.getQueue();
    await queue.connect();
    await queue.enqueue(q, func, args);
  }

  public static async endQueue() {
    await this.getQueue().end();
  }

  private static getQueue() {
    if (QueueService.queue) {
      return QueueService.queue;
    }
    QueueService.queue = new Queue({ connection: QueueService.connectionDetails() });
    return QueueService.queue;
  }
}