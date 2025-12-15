import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString({ message: 'O nome deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  name: string;

  @IsString({ message: 'O username deve ser uma string.' })
  @IsNotEmpty({ message: 'O username é obrigatório.' })
  @MinLength(3, { message: 'O username deve ter no mínimo 3 caracteres.' })
  username: string;

  @IsEmail({}, { message: 'O email deve ser um endereço de email válido.' })
  @IsNotEmpty({ message: 'O email é obrigatório.' })
  email: string;

  @IsString({ message: 'A senha deve ser uma string.' })
  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  password: string;
}