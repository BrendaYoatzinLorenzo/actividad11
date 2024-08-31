import { BadRequestException, Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Post('create')
  async createUser(@Body() user:any) {
    if (!user.email || !user.password || !user.username) {
      throw new BadRequestException('Name, email, and password are required');
    }
    return this.usersService.create(user);
  }

  @Get(':email')
  async getUserByEmail(@Param('email') email: string) {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  @Post('validate')
  async validateUser(@Body('email') email: string, @Body('password') password: string) {
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }
    const user = await this.usersService.validateUser(email, password);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    return user;
  }
}
