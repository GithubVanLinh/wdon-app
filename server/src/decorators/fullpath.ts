import { SetMetadata } from '@nestjs/common';

export const FULL_PATH = 'FULL_PATH';

/**
 * example: `@MediaPath(["abc.xyz", "name"])`
 */
export const MediaPath = (name: string[]) => SetMetadata(FULL_PATH, name);
