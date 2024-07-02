import { MediaError } from './MediaError';

export class StickerNameHasBeenExistsError extends MediaError {
  constructor(name: string) {
    super(`"${name}" has been exists`);
  }
}
