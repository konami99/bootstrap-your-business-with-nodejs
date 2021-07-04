import EmailService from './emailService';
import EmailProviderInterface from './emailProviderInterface';

const emailProviderMock = {
  send: jest.fn()
} as EmailProviderInterface;

afterEach(() => {
  jest.clearAllMocks();
});

describe('EmailService', () => {
  it('calls send on email provider', async () => {
    const receiver = 'test@gmail.com';
    const emailService = new EmailService(emailProviderMock);
    await emailService.send(receiver);
    expect(emailProviderMock.send).toHaveBeenCalledWith(receiver);
  })
});