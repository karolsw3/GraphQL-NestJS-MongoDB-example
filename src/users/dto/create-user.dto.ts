import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateUserDto {
  @Field()
  readonly name: string;
  @Field()
  readonly email: string;
  @Field()
  readonly password: string;
}