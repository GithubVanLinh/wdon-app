import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  FileValidator,
} from '@nestjs/common';
import { IFile } from '@nestjs/common/pipes/file/interfaces';

@Injectable()
export class FileRequiredValidationPipe extends FileValidator<
  Record<string, any>,
  IFile
> {
  protected validationOptions: Record<string, any>;
  isValid(
    file?: IFile | IFile[] | Record<string, IFile[]>,
  ): boolean | Promise<boolean> {
    if (!file) {
      return false;
    }

    if (Array.isArray(file)) {
      file.length == 0;
      return false;
    }

    return true;
  }
  buildErrorMessage(file: any): string {
    return 'File should exists';
  }
}
