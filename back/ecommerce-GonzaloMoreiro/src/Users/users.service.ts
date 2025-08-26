import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repositoy';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}
  getUsers() {
    return this.usersRepository.getUsers();
  }

  getUserById(id: string) {
    return this.usersRepository.getById(id);
  }

  createUser(newUser: User): string {
    return this.usersRepository.createUser(newUser);
  }

  updateUserById(id: string, user: Omit<User, 'id'>) {
    return this.usersRepository.updateById(id, user);
  }

  deleteUserById(id: string) {
    return this.usersRepository.deleteById(id);
  }
}
