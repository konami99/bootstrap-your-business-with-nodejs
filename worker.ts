import { MultiWorker, Scheduler, Queue } from 'node-resque';
import SendEmailJob from './jobs/sendEmailJob';
import QueueService from './services/queue/queueService';

class JobWrapper {
  static wrap(proxy: any) {
    return {
      perform: async (...args: []) => {
        return await proxy.perform.apply(proxy, args)
      }
    }
  }
}

async function start() {
  const jobs = {
    send : JobWrapper.wrap(new SendEmailJob()),
  }

  const multiWorker = new MultiWorker(
    {
      connection: QueueService.connectionDetails(),
      queues: ['email'],
      minTaskProcessors: 1,
      maxTaskProcessors: 100,
      checkTimeout: 1000,
      maxEventLoopDelay: 10,
    },
    jobs
  );

  const scheduler = new Scheduler({ connection: QueueService.connectionDetails() });

  multiWorker.start();

  await scheduler.connect();
  scheduler.start();

  async function shutdown() {
    console.log('shutting down...');
    await QueueService.endQueue();
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