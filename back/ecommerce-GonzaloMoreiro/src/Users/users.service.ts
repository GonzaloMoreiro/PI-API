import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repositoy';
import { User } from './user.interface';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}
  getUsers() {
    return this.usersRepository.getUsers();
  }

  getUserById(id: number) {
    return this.usersRepository.getById(id);
  }

  createUser(user: Omit<User, 'id'>): Promise<User> {
    return this.usersRepository.createUser(user);
  }

  updateUserById(id: number, user: Omit<User, 'id'>) {
    return this.usersRepository.updateById(id, user);
  }

  deleteUserById(id: number) {
    return this.usersRepository.deleteById(id);
  }
}
