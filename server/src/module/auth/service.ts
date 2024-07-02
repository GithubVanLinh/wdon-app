import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { Auth, AuthDocument } from 'src/module/auth/model/auth.schema';
import { CreateAuthDto } from './dto/create';
import { JwtService } from '@nestjs/jwt';
import { PayloadJWT } from './types/payload';
import { Injectable } from '@nestjs/common';
import { compareHash, hash } from 'src/utils/bcrypt';
import { UsernameAlreadyExistsError } from './errors/exists';
import { UserDocument } from '../user/model/user.schema';
import { ProfileDocument } from '../user/model/profile.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private authModel: Model<Auth>,
    private jwtService: JwtService,
  ) {}

  async create(
    createAuthDto: CreateAuthDto,
    session?: ClientSession,
  ): Promise<Auth> {
    const existsAuth = await this.authModel.findOne({
      username: createAuthDto.username,
    });

    if (existsAuth) {
      throw new UsernameAlreadyExistsError();
    }

    const auth = await new this.authModel({
      ...createAuthDto,
      user: createAuthDto.user_id,
      password: await hash(createAuthDto.password),
    }).save({
      session: session,
    });
    return auth;
  }

  async validateUser(
    username: string,
    pass: string,
  ): Promise<Omit<Auth, 'password'>> {
    const user = (
      await this.authModel.aggregate([
        {
          $match: {
            username: username,
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'users',
          },
        },
        {
          $unwind: {
            path: '$users',
          },
        },
        {
          $lookup: {
            from: 'profiles',
            localField: 'users.profile',
            foreignField: '_id',
            as: 'profile',
          },
        },
        {
          $unwind: {
            path: '$profile',
          },
        },
      ])
    )[0];
    if (user && (await compareHash(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = JSON.parse(JSON.stringify(user));
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload: PayloadJWT = {
      username: user.username,
      profile_id: user.profile._id,
      user_id: user.users._id,
      name: user.profile.firstName,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
