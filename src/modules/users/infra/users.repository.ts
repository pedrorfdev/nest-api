import {Injectable,NotFoundException,} from '@nestjs/common';
import type { UpdateUserDto } from '../domain/dto/update-user.dto';
import { User } from '../domain/entities/user.entity';
import type {
  IUserRepository,
} from '../domain/repositories/IUser.repository';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
    const newUser = await this.usersRepository.save(user);

    return newUser;
  }

  async findByEmail(email: string): Promise<User | null>{
    return this.usersRepository.findOneBy({ email });
  }

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find();

    return users;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`Usuário com ID "${id}" não encontrado`);
    }
    
    return user
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    const result = await this.usersRepository.update(id, data);

    if (result.affected === 0) {
      throw new NotFoundException(
        `Usuário com ID "${id}" não encontrado para atualização.`,
      );
    }

    const updatedUser = await this.usersRepository.findOneBy({ id });

    if(!updatedUser){
      throw new NotFoundException(`Erro ao recuperar o usuário atualizado.`)
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
