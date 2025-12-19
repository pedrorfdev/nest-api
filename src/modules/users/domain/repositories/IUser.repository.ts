import type { CreateUserDto } from "../dto/create-user.dto"
import type { UpdateUserDto } from "../dto/update-user.dto"
import type { User } from "../entities/user.entity"

export const USER_REPOSITORY_TOKEN = 'USER_REPOSITORY'

export interface IUserRepository {
  create(data: CreateUserDto): Promise<User>
  findAll(): Promise<User[]>
  findOne(id: number): Promise<User>
  findByEmail(email: string): Promise<User | null>;
  update(id: number, data: UpdateUserDto): Promise<User>
  remove(id: number): Promise<void>
}