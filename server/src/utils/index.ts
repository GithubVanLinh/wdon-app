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

/**
 * save file to local host
 * @param folderPath path to folder
 * @param file File to save
 * @returns name of file
 */
export function saveFileToLocal(
  folderPath: string,
  file: { mimetype: string; buffer: Buffer },
) {
  const name =
    randomString(5) +
    Date.now().toString() +
    getExtFromMIME(file.mimetype as AllowMimeType);
  const folderName = path.join(process.cwd(), folderPath);
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }
  const realPath = path.join(folderName, name);
  fs.writeFileSync(realPath, file.buffer);
  return name;
}

export function deleteFileFromLocal(spath: string) {
  const realPath = path.join(process.cwd(), spath);
  fs.unlinkSync(realPath);
}

export function deleteFilesFromLocal(
  folderPath: string,
  listName: Array<string>,
) {
  for (const name of listName) {
    const realPath = path.join(process.cwd(), folderPath, name);
    fs.unlinkSync(realPath);
  }
}

// export function saveFilesToLocal(
//   path: string,
//   files: [{ mimetype: string; buffer: Buffer }]
// ) {

// }
