import QueueService from './queueService'
import { Queue } from 'node-resque';

// see https://jestjs.io/docs/en/es6-class-mocks#mocking-non-default-class-exports
const enqueueMock = jest.fn();

jest.mock('node-resque', () => {
  return { 
    Queue: jest.fn().mockImplementation(() => {
      return {
        connect: jest.fn(),
        enqueue: enqueueMock,
        end: jest.fn()
      }
    }),
  }
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('QueueService', () => {
  it('calls enqueue on Queue', async () => {
    await QueueService.enqueue('queue1', 'sendEmail');

    expect(enqueueMock).toBeCalled()
  })
})