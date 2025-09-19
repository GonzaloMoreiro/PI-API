import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/Users/dtos/createUser.dto';
import { UsersRepository } from 'src/Users/users.repositoy';
import * as bcrypt from 'bcrypt';
import { GetUserDto } from 'src/Users/dtos/getUser.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(data: CreateUserDto): Promise<GetUserDto> {
    const user = await this.usersRepository.getByEmail(data.email);
    if (user) throw new BadRequestException('Email already exist');
    if (data.password !== data.confirmPassword) {
      throw new BadRequestException('The Passwords dont match');
    }

    const hashPass = await bcrypt.hash(data.password, 10);
    if (!hashPass) {
      throw new BadRequestException('password could not de hashed');
    }

    await this.usersRepository.saveUser({ ...data, password: hashPass });
    const { confirmPassword, password, ...rest } = data;
    return rest;
  }

  async signIn(email: string, password: string): Promise<object> {
    const user = await this.usersRepository.getByEmail(email);
    if (!user) throw new BadRequestException('Invalid credentials');
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new BadRequestException('Invalid credentials');
    }
    const userPayload = {
      sub: user.id,
      id: user.id,
      email: user.email,
    };

    const token = this.jwtService.sign(userPayload);
    return { status: 'success', message: 'Login Sucessfully', token };
  }
}
