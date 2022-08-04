import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdatePasswordDto } from './dto/update.password.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  public async findAll() {
    const users = await this.userRepository.find();
    return users.map((user) => user.toResponse());
  }

  public async findOne(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (user) {
      return user.toResponse();
    }
    throw new NotFoundException(`user with id ${userId} doesn't exist`);
  }

  public async create(newUser: CreateUserDto) {
    const user = {
      login: newUser.login,
      password: newUser.password,
    };
    const createUser = await this.userRepository.create(user);
    return (await this.userRepository.save(createUser)).toResponse();
  }

  public async update(userId: string, newUserData: UpdatePasswordDto) {
    const updatedUser = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!updatedUser) {
      throw new NotFoundException(`user with id ${userId} doesn't exist`);
    }
    if (newUserData.oldPassword !== updatedUser.password) {
      throw new ForbiddenException(`user old password doesn't valid`);
    }
    Object.assign(updatedUser, { password: newUserData.newPassword });
    return (await this.userRepository.save(updatedUser)).toResponse();
  }

  public async delete(userId: string) {
    const result = await this.userRepository.delete(userId);
    if (result.affected === 0) {
      throw new NotFoundException(`user with id ${userId} was not found`);
    }
  }

  async findeByLogin(login: string) {
    const user = await this.userRepository.findOne({ where: { login } });
    if (user) return user;
  }

  async isLoginExists(login: string) {
    const user = await this.findeByLogin(login);
    if (user) {
      throw new BadRequestException(`user with ligin=${login} already exists`);
    }
  }
}
