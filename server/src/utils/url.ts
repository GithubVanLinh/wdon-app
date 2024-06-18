import { Media } from './config/media';

export function getFullMediaUrl(name: string) {
  if (!name) {
    name = Media.default.avatar;
  }
  if (name.startsWith('http')) {
    return name;
  }
  return process.env.BASE_URL + '/uploads/' + name;
}
