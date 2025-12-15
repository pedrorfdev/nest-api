import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import type { CreateUserDto } from '../domain/dto/create-user.dto';
import type { UpdateUserDto } from '../domain/dto/update-user.dto';
import type { CreateUserService } from '../services/create.service';
import type { FindAllUsersService } from '../services/find-all.service';
import type { FindOneUserService } from '../services/find-one.service';
import type { UpdateUserService } from '../services/update.service';
import type { DeleteUserService } from '../services/remove.service';


@Controller('users')
export class UserController {
  constructor(
    // Injeta os Casos de Uso diretamente
    private readonly createService: CreateUserService,
    private readonly findAllService: FindAllUsersService,
    private readonly findOneService: FindOneUserService,
    private readonly updateService: UpdateUserService,
    private readonly deleteService: DeleteUserService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.createService.execute(createUserDto);
  }

  @Get()
  findAll() {
    return this.findAllService.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findOneService.execute(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.updateService.execute(+id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.deleteService.execute(+id);
  }
}