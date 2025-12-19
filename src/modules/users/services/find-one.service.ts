import { Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY_TOKEN, type IUserRepository } from "../domain/repositories/IUser.repository";
import type { User } from "../domain/entities/user.entity";


@Injectable()
export class FindOneUserService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }
}