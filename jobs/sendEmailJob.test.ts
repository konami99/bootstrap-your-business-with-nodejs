import SendEmailJob from './sendEmailJob';
import EmailService from '../services/email/emailService';
import SendGrid from '../services/email/sendGrid';

jest.mock('../services/email/emailService');
jest.mock('../services/email/sendGrid');

afterEach(() => {
  jest.clearAllMocks();
});

describe('SendEmailJob', () => {
  it('calls EmailService', async () => {
    const receiver = 'test@gmail.com';

    const sendMock = jest.fn();
    EmailService.prototype.send = sendMock;

    await new SendEmailJob().perform(receiver);

    expect(sendMock).toHaveBeenCalledWith(receiver);
  });
});