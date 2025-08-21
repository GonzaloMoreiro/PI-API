import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { User } from './user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(200)
  @Get()
  getUsers(@Query('limit') limit = 5, @Query('page') page = 1) {
    const users = this.usersService.getUsers();
    console.log(`users limit => ${limit} page => ${page}`);

    return users;
  }

  @HttpCode(200)
  @Get(':id')
  getUserById(@Param('id') id: string) {
    const userFound = this.usersService.getUserById(Number(id));
    return userFound;
  }

  @HttpCode(201)
  @Post()
  createUser(@Body() user: User) {
    const data = this.usersService.createUser(user);
    return data;
  }

  @HttpCode(200)
  @Put(':id')
  updateUserById(@Param('id') id: string, @Body() user: User) {
    const userUpdate = this.usersService.updateUserById(Number(id), user);
    return `El usuario con id ${id} ha sido atualizado con exito`;
  }

  @HttpCode(200)
  @Delete(':id')
  deleteUserById(@Param('id') id: string) {
    const userDelete = this.usersService.deleteUserById(Number(id));
    return `El usuario con id ${id} ha sido eliminado con exito`;
  }
}
