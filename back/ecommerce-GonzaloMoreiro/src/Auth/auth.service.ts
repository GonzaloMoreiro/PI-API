import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/Users/users.repositoy';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}

  signIn(email: string, password: string): string {
    const user = this.usersRepository.getByEmail(email);
    if (!user || user?.password !== password) {
      return 'Credenciales Incorrectas';
    }
    return 'Login exitoso';
  }
}
