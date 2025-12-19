import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from '../users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './infra/auth.controller';
import { AuthService } from './service/auth.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[
    ConfigModule,
    forwardRef(() => UserModule),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
