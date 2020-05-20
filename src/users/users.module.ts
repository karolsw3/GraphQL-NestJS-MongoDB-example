import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';

@Module({
  providers: [UsersResolver],
})
// @ts-ignore
export class UsersModule {}
