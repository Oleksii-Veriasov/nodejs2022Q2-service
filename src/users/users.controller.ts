import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create.user.dto';
import { UpdatePasswordDto } from 'src/dto/update.password.dto';
import { User } from 'src/dto/user.dto';

import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(200)
  public async findAll(): Promise<Array<User>> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  public async findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.usersService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  public async create(@Body() newUser: CreateUserDto) {
    return await this.usersService.create(newUser);
  }

  @Delete(':id')
  @HttpCode(204)
  public async delete(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    await this.usersService.delete(id);
  }

  @Put(':id')
  @HttpCode(200)
  public async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() newUserData: UpdatePasswordDto,
  ) {
    return await this.usersService.update(id, newUserData);
  }
}
