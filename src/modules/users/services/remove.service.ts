import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY_TOKEN, type IUserRepository } from '../domain/repositories/IUser.repository';

@Injectable()
export class DeleteUserService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: number): Promise<void> {
    return this.userRepository.remove(id);
  }
}