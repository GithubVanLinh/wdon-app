import { InjectModel } from '@nestjs/mongoose';
import { User } from '../model/user.schema';
import { CreateUserDto } from '../dto/create';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../../auth/service';
import { AuthType } from '../../auth/model/auth.schema';
import { Model } from 'mongoose';
import { Profile } from '../model/profile.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
    private authService: AuthService,
  ) {}

  async createUser(
    create: CreateUserDto &
      (
        | Required<Omit<CreateUserDto, 'username' | 'password' | 'dateOfBirth'>>
        | Required<Omit<CreateUserDto, 'token' | 'dateOfBirth'>>
      ),
  ) {
    const session = await this.userModel.startSession();
    session.startTransaction();
    try {
      const opt = { session };
      const profile = await new this.profileModel({
        dayOfBirth: create.dateOfBirth,
        firstName: create.firstName,
        lastName: create.lastName,
        avatar: create.avatar,
      }).save(opt);
      const user = await new this.userModel({
        profile: profile,
      }).save(opt);
      profile.link = user.id;
      profile.save(opt);
      await this.authService.create(
        {
          type: AuthType.LOCAL,
          password: create.password,
          username: create.username,
          user_id: user.id,
        },
        session,
      );
      await session.commitTransaction();
      await session.endSession();
      return user;
    } catch (e) {
      console.log('e', e);
      await session.abortTransaction();
      session.endSession();
      throw e;
    }
  }
}
