import { Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY_TOKEN, type IUserRepository, type UserWithoutPassword } from "../domain/repositories/IUser.repository";


@Injectable()
export class FindOneUserService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: number): Promise<UserWithoutPassword> {
    return this.userRepository.findOne(id);
  }
}