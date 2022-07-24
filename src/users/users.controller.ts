import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdatePasswordDto } from './dto/update.password.dto';
import { UserDto } from './dto/user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserScheme } from './schemes/user.scheme';

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: HttpStatus.OK, type: [UserScheme] })
  @Get()
  @HttpCode(200)
  public async findAll() {
    return await this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Get one user by Id' })
  @ApiResponse({ status: HttpStatus.OK, type: UserScheme })
  @Get(':userId')
  @HttpCode(200)
  public async findOne(
    @Param('userId', new ParseUUIDPipe({ version: '4' })) userId: string,
  ) {
    return await this.usersService.findOne(userId);
  }

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: HttpStatus.CREATED, type: UserScheme })
  @Post()
  @HttpCode(201)
  public async create(@Body() newUser: CreateUserDto) {
    return await this.usersService.create(newUser);
  }

  @ApiOperation({ summary: 'Delete user by Id' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @Delete(':userId')
  @HttpCode(204)
  public async delete(
    @Param('userId', new ParseUUIDPipe({ version: '4' })) userId: string,
  ) {
    await this.usersService.delete(userId);
  }

  @ApiOperation({ summary: 'Update user by Id' })
  @ApiResponse({ status: HttpStatus.OK, type: UserScheme })
  @Put(':userId')
  @HttpCode(200)
  public async update(
    @Param('userId', new ParseUUIDPipe({ version: '4' })) userId: string,
    @Body() newUserData: UpdatePasswordDto,
  ) {
    return await this.usersService.update(userId, newUserData);
  }
}
