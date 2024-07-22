import * as fs from 'fs';
import * as path from 'path';
import { randomString } from './string';

export type AllowMimeType =
  | 'image/png'
  | 'image/jpeg'
  | 'video/mp4'
  | 'text/plain'
  | 'image/webp';

export function getExtFromMIME(mime: AllowMimeType) {
  const data = {
    'image/png': '.png',
    'image/jpeg': '.jpg',
    'video/mp4': '.mp4',
    'text/plain': '.txt',
    'image/webp': '.webp',
  };
  return data[mime];
}

export function removeFolder(folderPath: string) {
  const exists = fs.existsSync(folderPath);
  if (exists) {
    fs.rmSync(folderPath, { force: true, recursive: true });
  }
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
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

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
