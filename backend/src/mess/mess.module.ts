import { Module } from '@nestjs/common';
import { MessController } from './mess.controller';
import { MessService } from './mess.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/entities/users.entity';
import { MessesEntity } from 'src/entities/messes.entity';
import { MembersEntity } from 'src/entities/members.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, MessesEntity, MembersEntity]),
  ],
  controllers: [MessController],
  providers: [MessService],
})
export class MessModule {}
