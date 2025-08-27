import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repositoy';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  getUsers(page: number, limit: number): Omit<User, 'password'>[] {
    const allUsers = this.usersRepository.getUsers(page, limit);
    return allUsers.map(({ password, ...rest }) => rest);
  }

  getUserById(id: string): Omit<User, 'password'> | undefined {
    const userFound = this.usersRepository.getById(id);
    if (userFound) {
      const { password, ...rest } = userFound;
      return rest;
    } else {
      return undefined;
    }
  }

  createUser(newUser: User): string {
    return this.usersRepository.createUser(newUser);
  }

  updateUserById(id: string, updateUser): string | undefined {
    return this.usersRepository.updateById(id, updateUser);
  }

  deleteUserById(id: string): string {
    return this.usersRepository.deleteById(id);
  }
}
