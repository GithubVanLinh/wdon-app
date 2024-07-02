import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './model/user.schema';
import { UserService } from './services/user';
import { AuthModule } from '../auth/module';
import { UserController } from './controllers/users';
import {
  Profile,
  ProfileDocument,
  ProfileSchema,
} from './model/profile.schema';
import { getFullMediaUrl } from 'src/utils/url';
import { ProfileController } from './controllers/profile';
import { ProfileService } from './services/profile';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          return UserSchema;
        },
      },
      {
        name: Profile.name,
        useFactory: () => {
          const schema = ProfileSchema;
          schema.post('find', (res) => {
            const data = res as ProfileDocument[];
            data.map((d) => {
              d.avatar = getFullMediaUrl(d.avatar);
            });
          });
          return ProfileSchema;
        },
      },
    ]),
    AuthModule,
  ],
  controllers: [UserController, ProfileController],
  providers: [UserService, ProfileService],
  exports: [UserService, ProfileService],
})
export class UserModule {}
