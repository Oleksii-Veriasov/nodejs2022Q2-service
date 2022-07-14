import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create.user.dto';
import { User } from 'src/dto/user.dto';

import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(200)
  public findAll(): Array<User> {
    console.log('uses');
    return this.usersService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  public findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  public create(@Body() newUser: CreateUserDto) {
    return this.usersService.create(newUser);
  }

  @Delete(':id')
  @HttpCode(204)
  public delete(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): void {
    this.usersService.delete(id);
  }
}
