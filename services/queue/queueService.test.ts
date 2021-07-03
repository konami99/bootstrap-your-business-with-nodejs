import QueueService from './queueService';

// see https://jestjs.io/docs/en/es6-class-mocks#mocking-non-default-class-exports
const enqueueMock = jest.fn();

jest.mock('node-resque', () => {
  return { 
    Queue: jest.fn(() => {
      return {
        connect: () => {},
        enqueue: enqueueMock,
        end: () => {}
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
    await QueueService.endQueue();
    expect(enqueueMock).toHaveBeenCalled()
  })
})