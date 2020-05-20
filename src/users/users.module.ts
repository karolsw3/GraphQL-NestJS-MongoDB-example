import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UserSchema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'User',
      schema: UserSchema
    }])
  ],
  providers: [
    UsersResolver,
    UsersService
  ]
})
// @ts-ignore
export class UsersModule {}
