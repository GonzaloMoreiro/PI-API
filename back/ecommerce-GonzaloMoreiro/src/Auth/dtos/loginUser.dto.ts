import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/Users/dtos/createUser.dto';

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}
