import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersRepository {
  private users: User[] = [
    {
      id: '1',
      email: 'gonzalo@gmail.com',
      name: 'Gonzalo',
      password: '3123124123fas',
      address: 'Peron 689',
      phone: '546667123',
      country: 'Argentina',
      city: 'Rufino',
    },
    {
      id: '2',
      email: 'mario@gmail.com',
      name: 'Mario',
      password: 'gasdasdasd',
      address: 'Siempre Viva 123',
      phone: '546667123',
      country: 'España',
      city: 'Ibiza',
    },
    {
      id: '3',
      email: 'hector@gmail.com',
      name: 'Hector',
      password: 'sdgsdbsdbsf',
      address: 'Puito 9876',
      phone: '546667123',
      country: 'Brazil',
      city: 'Brasilia',
    },
    {
      id: '4',
      email: 'nanci@gmail.com',
      name: 'Nanci',
      password: '4123124',
      address: 'Estrada 5412',
      phone: '546667123',
      country: 'Mexico',
      city: 'Cancun',
    },
  ];

  getUsers() {
    return this.users;
  }

  getById(id: string): User | undefined {
    const userFound = this.users.find((users) => users.id === id);
    return userFound;
  }

  createUser(newUser: User): string {
    const id = this.users.length + 1;
    newUser.id = id.toString();
    this.users.push(newUser);
    return `Usuario ${newUser.id} creado correctamente`;
  }

  updateById(id: string, user: Omit<User, 'id'>): string | undefined {
    const userFind = this.users.find((users) => users.id === id);
    if (userFind) {
      userFind.address = user.address;
      userFind.city = user.city;
      userFind.country = user.country;
      userFind.email = user.email;
      userFind.name = user.name;
      userFind.password = user.password;
      userFind.phone = user.phone;
    } else {
      return undefined;
    }
    return `Usuario ${userFind.id} actualizado correctamente`;
  }

  deleteById(id: string): string {
    this.users = this.users.filter((users) => users.id !== id);
    return `Usuario ${id} eliminado correctamente`;
  }
}
