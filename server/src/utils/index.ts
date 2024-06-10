import * as fs from 'fs';
import * as path from 'path';
import { randomString } from './string';

export type AllowMimeType =
  | 'image/png'
  | 'image/jpeg'
  | 'video/mp4'
  | 'text/plain';

export function getExtFromMIME(mime: AllowMimeType) {
  const data = {
    'image/png': '.png',
    'image/jpeg': '.jpg',
    'video/mp4': '.mp4',
    'text/plain': '.txt',
  };
  return data[mime];
}

export function saveFileToLocal(
  folderPath: string,
  file: { mimetype: string; buffer: Buffer },
) {
  const name =
    randomString(5) +
    Date.now().toString() +
    getExtFromMIME(file.mimetype as AllowMimeType);
  const realPath = path.join(folderPath, name);
  fs.writeFileSync(realPath, file.buffer);
  return name;
}

export function deleteFileFromLocal(path: string) {
  fs.unlinkSync(path);
}

// export function saveFilesToLocal(
//   path: string,
//   files: [{ mimetype: string; buffer: Buffer }]
// ) {

// }
