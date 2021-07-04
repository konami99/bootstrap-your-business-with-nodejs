import EmailProviderInterface from './emailProviderInterface';

export default class EmailService {
  constructor(private emailProvider: EmailProviderInterface) {

  }

  public async send(email: string) {
    this.emailProvider.send(email);
  }
}
