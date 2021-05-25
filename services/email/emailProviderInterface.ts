export default interface EmailProviderInterface {
  send(email: string): void;
}