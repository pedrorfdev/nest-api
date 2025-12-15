import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../domain/dto/create-user.dto';
import type { UpdateUserDto } from '../domain/dto/update-user.dto';
import { User } from '../domain/entities/user';
import type {
  IUserRepository,
  UserWithoutPassword,
} from '../domain/repositories/IUser.repository';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import bcrypt from 'node_modules/bcryptjs';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<UserWithoutPassword> {
    const newUser = await this.usersRepository.save(user);

    const { password, ...result } = newUser;
    return result;
  }

  async findById(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async findByUsernameOrEmail(
    username: string,
    email: string,
  ): Promise<User | null> {
    return this.usersRepository.findOne({
      where: [{ username }, { email }],
    });
  }

  async findAll(): Promise<UserWithoutPassword[]> {
    const users = await this.usersRepository.find();
    return users;
  }

  async findOne(id: number): Promise<UserWithoutPassword> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Usuário com ID "${id}" não encontrado`);
    }
    const { password, ...result } = user;
    return result;
  }

  async findOneByUserWithPassword(username: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ 
      where: { username },
      select: ['id', 'name', 'username', 'email', 'password'],
    });

    if(!user){
      throw new NotFoundException(`Usuário com username "${username}" não encontrado`);
    }
    
    return user
  }

  async update(id: number, data: UpdateUserDto): Promise<UserWithoutPassword> {
    const result = await this.usersRepository.update(id, data);

    if (result.affected === 0) {
      throw new NotFoundException(
        `Usuário com ID "${id}" não encontrado para atualização.`,
      );
    }

    const updatedUser = await this.usersRepository.findOneBy({ id });

    if (!updatedUser) {
        // Isso é uma falha de consistência no DB, mas garante a tipagem.
        throw new NotFoundException(`Falha na recuperação do usuário ID "${id}" após atualização.`);
    }

    return updatedUser;
  }

  async remove(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
  }
}
