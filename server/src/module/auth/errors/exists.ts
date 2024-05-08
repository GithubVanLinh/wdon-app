import { BadRequestException } from '@nestjs/common';

export class UsernameAlreadyExistsError extends BadRequestException {
  constructor() {
    super('username already existed');
  }
}
