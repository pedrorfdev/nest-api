import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "src/modules/users/domain/dto/create-user.dto";

export class RegisterDto extends PartialType(CreateUserDto){}