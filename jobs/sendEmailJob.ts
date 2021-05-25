import EmailService from '../services/email/emailService';
import SendGrid from '../services/email/sendGrid';

export default class SendEmailJob {
  async perform(...args: string[]): Promise<void> {
    const sendGrid = new SendGrid();
    const emailService = new EmailService(sendGrid);
    await emailService.send(args[0]);
  }
}
