import sgMail from '@sendgrid/mail';
import SendGrid from './sendGrid';

jest.mock('@sendgrid/mail');

afterEach(() => {
  jest.clearAllMocks();
});

describe('SendGrid', () => {
  it('calls send on sgMail', async () => {
    const sendGrid = new SendGrid();
    sendGrid.send('test@gmail.com');

    expect(sgMail.send).toHaveBeenCalled();
  });
});