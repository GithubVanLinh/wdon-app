import { ObjectId } from 'mongoose';
import { AuthType } from 'src/module/auth/model/auth.schema';

export class CreateAuthDto {
  username?: string;
  password?: string;
  token?: string;
  type: AuthType;
  user_id: ObjectId;
}
