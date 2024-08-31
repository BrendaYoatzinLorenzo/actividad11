import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './jwt.strategy';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {constructor(
  private usersService: UsersService,
  private jwtService: JwtService,
) {}

async validateUser(username: string, password: string): Promise<any> {
  const user = await this.usersService.findOne(username);
  if (user && user.password === password) { // Asegúrate de usar hash en producción
    const { password, ...result } = user;
    return result;
  }
  return null;
}

async login(user: User) {
  const payload: JwtPayload = { username: user.username };
  return {
    access_token: this.jwtService.sign(payload),
  };
}

async getProfile(username: string): Promise<User> {
  return this.usersService.findOne(username); // Ensure this returns a user with the expected username
}

}
