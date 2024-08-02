import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Conversation,
  ConversationTypeEnum,
  Participant,
} from '../models/conversation';
import mongoose, { SessionOption, Model } from 'mongoose';
import { CreateConversationDto } from '../dto/create-conversation';
import { ProfileService } from 'src/module/user/services/profile';
import { FindConversationDto } from '../dto/find-conversation';

@Injectable()
export class ConversationService {
  constructor(
    @InjectModel(Conversation.name)
    private conversationModel: Model<Conversation>,
    private profileService: ProfileService,
  ) {}

  async find(condition: FindConversationDto) {
    const conditions: any = [
      {
        'participants.profile': new mongoose.Types.ObjectId(
          condition.profile_id,
        ),
      },
    ];
    if (condition.type) {
      conditions.push({
        type: condition.type,
      });
    }

    if (condition.target) {
      conditions.push({
        'participants.profile': new mongoose.Types.ObjectId(condition.target),
      });
      conditions.push({
        type: ConversationTypeEnum.PERSONAL,
      });
    }

    const data = await this.conversationModel.aggregate([
      // { $match: { type: type } },
      // { $unwind: { path: '$participants' } },
      {
        $match: {
          $and: conditions,
        },
      },
      // {
      //   $lookup: {
      //     from: 'profiles',
      //     as: 'participants_proifle',
      //     localField: 'participants.profile',
      //     foreignField: '_id',
      //   },
      // },
    ]);
    return data;
  }

  async findById(id: string) {
    return await this.conversationModel.findById(id);
  }

  async create(
    conversationDto: CreateConversationDto & { owner: string },
    opt?: SessionOption,
  ) {
    if (opt?.session) {
      await this.createConversationWithSession(conversationDto, opt);
    } else {
      const session = await this.conversationModel.startSession();
      session.startTransaction();
      try {
        const data = await this.createConversationWithSession(conversationDto, {
          session,
        });
        session.commitTransaction();
        return data;
      } catch (e) {
        await session.abortTransaction();
        await session.endSession();
      }
    }
  }

  async createConversationWithSession(
    convesationDto: CreateConversationDto,
    sessionOpt: SessionOption,
  ) {
    const type = convesationDto.type;
    const participants: Array<Participant> = [];
    if (type === ConversationTypeEnum.PERSONAL) {
      const first = convesationDto.participants[0];
      const firstProfile = await this.profileService.getProfileById(
        first.profile,
      );
      const second = convesationDto.participants[1];
      const secondProfile = await this.profileService.getProfileById(
        second.profile,
      );
      const firstName = first.name ?? secondProfile.firstName;
      const secondName = second.name ?? firstProfile.firstName;
      participants.push(
        { profile: firstProfile._id, name: firstName },
        { profile: secondProfile._id, name: secondName },
      );
    } else {
      const profileList = await Promise.all(
        convesationDto.participants.map(
          async (par) => await this.profileService.getProfileById(par.profile),
        ),
      );
      convesationDto.participants.forEach(async (participant, index) => {
        const profile = profileList[index];
        participants.push({ name: 'group', profile: profile._id });
      });
    }

    const conversation = await new this.conversationModel({
      type: convesationDto.type,
      participants: participants,
    }).save(sessionOpt);

    return conversation;
  }
}
