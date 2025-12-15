import { Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY_TOKEN, type IUserRepository, type UserWithoutPassword } from "../domain/repositories/IUser.repository";

@Injectable()
export class FindAllUsersService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(): Promise<UserWithoutPassword[]> {
    return this.userRepository.findAll();
  }
}