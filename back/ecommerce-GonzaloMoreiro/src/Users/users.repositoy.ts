import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/createUser.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getUsers(page: number = 1, limit: number = 5): Promise<User[]> {
    const startIndex = (page - 1) * limit;
    let users = await this.usersRepository.find();
    users = users.slice(startIndex, startIndex + limit);
    return users;
  }

  async getById(id: string): Promise<User | null> {
    const userFound = await this.usersRepository.findOne({
      where: { id },
      relations: { orders: true },
    });
    return userFound;
  }

  async getByEmail(email: string): Promise<User | null> {
    const userFound = await this.usersRepository.findOne({ where: { email } });
    return userFound;
  }

  async saveUser(data): Promise<string | null> {
    await this.usersRepository.save(data);
    return data.id;
  }

  async updateById(id: string, user: CreateUserDto): Promise<string | null> {
    const userFind = await this.usersRepository.findOne({ where: { id } });
    if (!userFind) return null;
    this.usersRepository.merge(userFind, user);
    await this.usersRepository.save(userFind);
    return id;
  }

  async deleteById(id: string): Promise<string | null> {
    const userFound = await this.usersRepository.findOne({ where: { id } });
    if (!userFound) return null;
    await this.usersRepository.delete(id);
    return id;
  }
}
