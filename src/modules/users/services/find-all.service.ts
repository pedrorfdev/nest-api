import { Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY_TOKEN, type IUserRepository } from "../domain/repositories/IUser.repository";
import type { User } from "../domain/entities/user.entity";

@Injectable()
export class FindAllUsersService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}