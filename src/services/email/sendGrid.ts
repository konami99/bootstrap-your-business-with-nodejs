import sgMail from '@sendgrid/mail';
import EmailProviderInterface from './emailProviderInterface';

export default class SendGrid implements EmailProviderInterface {
  public async send(email: string): Promise<void> {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
    const msg = {
      to: email,
      from: '',
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }

    await sgMail.send(msg);
  }
}