import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { User } from './user.entity';
import { validateUser } from 'src/utils/validate';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  getUsers(@Query('limit') limit = 5, @Query('page') page = 1) {
    return this.usersService.getUsers(page, limit);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createUser(@Body() newUser: User) {
    if (validateUser(newUser)) {
      return this.usersService.createUser(newUser);
    } else {
      return 'Usuario no valido';
    }
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  updateUserById(@Param('id') id: string, @Body() updateUser: User) {
    if (validateUser(updateUser)) {
      return this.usersService.updateUserById(id, updateUser);
    } else {
      return 'Usuario no valido';
    }
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  deleteUserById(@Param('id') id: string) {
    return this.usersService.deleteUserById(id);
  }
}
