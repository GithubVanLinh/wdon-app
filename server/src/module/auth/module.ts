import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from 'src/module/auth/model/auth.schema';
import { AuthController } from './controller';
import { AuthService } from './service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: '1y' },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
