import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./domain/entities/user";
import { USER_REPOSITORY_TOKEN } from "./domain/repositories/IUser.repository";
import { UserRepository } from "./infra/users.repository";
import { CreateUserService } from "./services/create.service";
import { UserController } from "./infra/users.controllers";
import { FindAllUsersService } from "./services/find-all.service";
import { FindOneUserService } from "./services/find-one.service";
import { UpdateUserService } from "./services/update.service";
import { DeleteUserService } from "./services/remove.service";
import { FindUserForAuthService } from "./services/find-user-for-auth.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: UserRepository
    },
    CreateUserService,
    FindAllUsersService,
    FindOneUserService,
    UpdateUserService,
    DeleteUserService,
    FindUserForAuthService,
  ],
  exports: [TypeOrmModule, FindUserForAuthService]
})
export class UserModule{}