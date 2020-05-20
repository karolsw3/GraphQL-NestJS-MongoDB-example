import { Query, Resolver } from '@nestjs/graphql'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { Mutation } from 'type-graphql';
import { UserInput } from './inputs/user.input';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Query(() => [CreateUserDto])
  async users() {
    return this.usersService.findAll()
  }

  @Mutation(() => [CreateUserDto])
  async createUser (
    input: UserInput
  ) {
    return this.usersService.create(input)
  }
}
