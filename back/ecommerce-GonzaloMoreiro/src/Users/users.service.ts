import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from './users.repositoy';
import { GetUserDto } from './dtos/getUser.dto';
import { CreateUserDto } from './dtos/createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async getUsers(page: number, limit: number): Promise<Partial<GetUserDto>[]> {
    const allUsers = await this.usersRepository.getUsers(page, limit);
    return allUsers.map(({ password, isAdmin, ...rest }) => rest);
  }

  async getUserById(id: string): Promise<Partial<GetUserDto> | null> {
    const userFound = await this.usersRepository.getById(id);
    if (!userFound) throw new NotFoundException('Usuario no encontrado');
    const { password, isAdmin, ...rest } = userFound;
    return rest;
  }

  async updateUserById(
    id: string,
    updateUser: CreateUserDto,
  ): Promise<string | null> {
    const user = await this.usersRepository.getByEmail(updateUser.email);
    if (user) throw new NotFoundException('Email ya registrado');

    if (updateUser.password !== updateUser.confirmPassword) {
      throw new BadRequestException('The Passwords dont match');
    }

    const hashPass = await bcrypt.hash(updateUser.password, 10);
    if (!hashPass) {
      throw new BadRequestException('password could not de hashed');
    }
    const userUpdate = await this.usersRepository.updateById(id, {
      ...updateUser,
      password: hashPass,
    });
    if (!userUpdate) throw new NotFoundException('Error al actualizar usuario');
    return `Usuario ${userUpdate} actualizado con exito`;
  }

  async deleteUserById(id: string): Promise<string | null> {
    const user = await this.usersRepository.deleteById(id);
    if (!user) throw new NotFoundException('El usuario no existe');
    return `El usuario ${user} a sido eliminado con exito`;
  }
}
