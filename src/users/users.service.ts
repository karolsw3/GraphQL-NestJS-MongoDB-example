import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { UserInput } from './inputs/user.input';
import { UserType } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  // CRUD
  async create (createUserDto: UserInput): Promise<User> {
    const createdUser = new this.userModel(createUserDto)
    return createdUser.save();
  }

  async findAll (): Promise<UserType[]> {
    return this.userModel.find().exec()
  }

  async findOne (id: string): Promise<UserType> {
    return this.userModel.findOne({ _id: id })
  }

  async delete (id: string): Promise<UserType> {
    return this.userModel.findByIdAndRemove(id)
  }

  async update (id: string, user: User): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, user, { new: true })
  }
}
