import { Injectable } from '@nestjs/common';
import { User } from './user.interface';

@Injectable()
export class UsersRepository {
  private users: User[] = [
    {
      id: 1,
      email: 'gonzalo@gmail.com',
      name: 'Gonzalo',
      password: '3123124123fas',
      address: 'Peron 689',
      phone: '546667123',
      country: 'Argentina',
      city: 'Rufino',
    },
    {
      id: 2,
      email: 'mario@gmail.com',
      name: 'Mario',
      password: 'gasdasdasd',
      address: 'Siempre Viva 123',
      phone: '546667123',
      country: 'España',
      city: 'Ibiza',
    },
    {
      id: 3,
      email: 'hector@gmail.com',
      name: 'Hector',
      password: 'sdgsdbsdbsf',
      address: 'Puito 9876',
      phone: '546667123',
      country: 'Brazil',
      city: 'Brasilia',
    },
    {
      id: 4,
      email: 'nanci@gmail.com',
      name: 'Nanci',
      password: '4123124',
      address: 'Estrada 5412',
      phone: '546667123',
      country: 'Mexico',
      city: 'Cancun',
    },
  ];

  async getUsers() {
    return this.users.map(({ password, ...sinPass }) => sinPass);
  }

  async getById(id: number) {
    const sinPass = this.users.map(({ password, ...sinPass }) => sinPass);
    return sinPass.find((users) => users.id === id);
  }

  async createUser(user: Omit<User, 'id'>) {
    const id = this.users.length + 1;
    this.users.push({ id, ...user });
    return { id, ...user };
  }

  async updateById(id: number, user: Omit<User, 'id'>) {
    const userFind = this.users.find((users) => users.id === id);
    if (userFind) {
      userFind.address = user.address;
      userFind.city = user.city;
      userFind.country = user.country;
      userFind.email = user.email;
      userFind.name = user.name;
      userFind.password = user.password;
      userFind.phone = user.phone;
    }
    return id;
  }

  async deleteById(id: number) {
    this.users = this.users.filter((users) => users.id !== id);
    return id;
  }
}
