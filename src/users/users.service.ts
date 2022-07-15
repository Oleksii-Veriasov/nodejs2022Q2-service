import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create.user.dto';
import { UpdatePasswordDto } from 'src/dto/update.password.dto';
import { User } from 'src/dto/user.dto';
import { v4 as uuidv4 } from 'uuid';
import { omit } from './../helper';

@Injectable()
export class UsersService {
  private users: Array<User> = [
    {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      login: 'MyUser',
      password: 'qweqweqwe',
      version: 1,
      createdAt: 1655000000,
      updatedAt: 1655000000,
    },
  ];

  public findAll(): Array<User> {
    console.log('uses');
    return this.users.map((user) => omit(user, 'password'));
  }

  public findOne(id: string): User {
    const user: User = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`user with id ${id} doesn't exist`);
    }
    return omit(user, 'password');
  }

  public create(newUser: CreateUserDto) {
    const user = {
      id: uuidv4(),
      login: newUser.login,
      password: newUser.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: null,
    };
    this.users.push(user);
    return omit(user, 'password');
  }

  public update(id: string, newUserData: UpdatePasswordDto) {
    const user: User = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`user with id ${id} doesn't exist`);
    }
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (newUserData.oldPassowrd === user.password) {
      (this.users[userIndex].password = newUserData.newPassword),
        ++this.users[userIndex].version;
      this.users[userIndex].updatedAt = Date.now();
    } else {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: "user old password doesn't valid",
        },
        HttpStatus.FORBIDDEN,
      );
    }
    return omit(this.users[userIndex], 'password');
  }

  public delete(id: string): void {
    const index: number = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundException('User not found.');
    }
    this.users.splice(index, 1);
  }
}
