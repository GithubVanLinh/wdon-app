export class MediaError extends Error {
  constructor(message: string) {
    super('MediaError: ' + message);
  }
}
