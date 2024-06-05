import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { AppError } from 'src/shared/utils/AppError.exception';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(user: CreateUserDto): Promise<Partial<User>> {
    const userAlreadyExists = await this.findOne(user.username);
    if (userAlreadyExists) {
      throw new AppError({
        id: "USER_ALREADY_EXISTS",
        message: "User already exists",
        status: HttpStatus.BAD_REQUEST
      })
    }
    try {
      const data = {
        ...user,
        password: bcrypt.hashSync(user.password, 10),
      };
      const createdUser = await this.userModel.create(data);
      const { password, ...result } = createdUser.toJSON();
      return result;
    } catch (error) {
      throw new AppError({
        id: "USER_CREATION_FAILED",
        message: "User creation failed",
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error
      });
    }
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username });
  }
}