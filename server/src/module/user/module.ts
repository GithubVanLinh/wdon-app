import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './model/user.schema';
import { UserService } from './service';
import { AuthModule } from '../auth/module';
import { UserController } from './controller';
import {
  Profile,
  ProfileDocument,
  ProfileSchema,
} from './model/profile.schema';
import { getFullMediaUrl } from 'src/utils/url';

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
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
