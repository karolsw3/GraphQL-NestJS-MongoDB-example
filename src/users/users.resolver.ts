import { Args, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service'
import { UserType } from './dto/create-user.dto'
import { Mutation } from 'type-graphql';
import { UserInput } from './inputs/user.input';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Query(() => [UserType])
  async users(): Promise<UserType[]> {
    return this.usersService.findAll()
  }

  @Mutation(() => UserType)
  async createUser (
    input: UserInput
  ): Promise<UserType> {
    return this.usersService.create(input)
  }

  @Mutation(() => UserType)
  async updateUser (
    @Args('id') id: string,
    @Args('input') input: UserInput
  ): Promise<UserInput> {
    return this.usersService.update(id, input)
  }

  @Mutation(() => UserType)
  async deleteUser (
    @Args('id') id: string
  ): Promise<UserInput> {
    return this.usersService.delete(id)
  }
}
