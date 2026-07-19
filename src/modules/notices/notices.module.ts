import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembersEntity } from 'src/entities/members.entity';
import { MessesEntity } from 'src/entities/messes.entity';
import { NoticesEntity } from 'src/entities/notices.enitity';
import { UsersEntity } from 'src/entities/users.entity';
import { GetMemberNoticesController } from './controller/getMemberNotices.controller';
import { GetNoticesController } from './controller/getNotices.controller';
import { SendMemberNoticeController } from './controller/sendMemberNotice.controller';
import { SendNoticeController } from './controller/sendNotice.controller';
import { GetMemberNoticesService } from './service/getMemberNotices.service';
import { GetNoticesService } from './service/getNotices.service';
import { SendMemberNoticeService } from './service/sendMemberNotice.service';
import { SendNoticeService } from './service/sendNotice.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MembersEntity,
      UsersEntity,
      NoticesEntity,
      MessesEntity,
    ]),
  ],
  controllers: [
    SendNoticeController,
    GetNoticesController,
    SendMemberNoticeController,
    GetMemberNoticesController,
  ],
  providers: [
    SendNoticeService,
    GetNoticesService,
    SendMemberNoticeService,
    GetMemberNoticesService,
  ],
})
export class NoticesModule {}
