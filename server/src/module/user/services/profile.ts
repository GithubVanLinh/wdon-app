import { InjectModel } from '@nestjs/mongoose';
import { Model, ClientSession, SessionOption } from 'mongoose';
import { Profile } from '../model/profile.schema';
import { Injectable } from '@nestjs/common';
import { UpdateProfileDto } from '../dto/update';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
  ) {}

  async getProfileById(profile_id: string, opt?: { session?: ClientSession }) {
    const profile = await this.profileModel.findById(profile_id, null, {
      session: opt?.session,
    });
    return profile;
  }

  async updateProfileById(
    profileId: string,
    dataUpdate: UpdateProfileDto,
    opt?: SessionOption,
  ) {
    const profile = await this.profileModel.findByIdAndUpdate(
      profileId,
      dataUpdate,
      opt,
    );

    return profile;
  }
}
