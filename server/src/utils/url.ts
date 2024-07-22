import { Media } from './config/media';
import * as path from 'path';

export function getFullMediaUrl(name: string) {
  if (!name) {
    name = Media.default.avatar;
  }
  if (name.startsWith('http')) {
    return name;
  }
  return path.join(process.env.BASE_URL, '/uploads/', name);
}
