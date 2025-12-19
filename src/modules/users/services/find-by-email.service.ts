import { Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY_TOKEN, type IUserRepository } from "../domain/repositories/IUser.repository";

@Injectable()
export class FindByEmailService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(email: string) {
    return this.userRepository.findByEmail(email);
  }
}