import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { USER_REPOSITORY_TOKEN, type IUserRepository } from '../domain/repositories/IUser.repository';
import type { UpdateUserDto } from '../domain/dto/update-user.dto';
import type { User } from '../domain/entities/user.entity';

@Injectable()
export class UpdateUserService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const userToUpdate = await this.userRepository.findOne(id);
    if (!userToUpdate) {
      throw new NotFoundException(`Usuário com ID "${id}" não encontrado`);
    }

    const dataToUpdate: Partial<User> = {};
    Object.assign(dataToUpdate, updateUserDto);

    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt(10);
      dataToUpdate.password = await bcrypt.hash(updateUserDto.password, salt);
    }

    const updatedUser = await this.userRepository.update(id, dataToUpdate);

    return updatedUser;
  }
}