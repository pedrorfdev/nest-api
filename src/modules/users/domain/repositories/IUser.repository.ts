import type { CreateUserDto } from "../dto/create-user.dto"
import type { UpdateUserDto } from "../dto/update-user.dto"
import type { User } from "../entities/user"

export type UserWithoutPassword = Omit<User, 'password'>

export const USER_REPOSITORY_TOKEN = 'USER_REPOSITORY'

export interface IUserRepository {
  create(data: CreateUserDto): Promise<UserWithoutPassword>
  findAll(): Promise<UserWithoutPassword[]>
  findOne(id: number): Promise<UserWithoutPassword>
  findOneByUserWithPassword(username: string): Promise<User | undefined>
  findByUsernameOrEmail(username: string, email: string): Promise<User | null>;
  update(id: number, data: UpdateUserDto): Promise<UserWithoutPassword>
  remove(id: number): Promise<void>
}