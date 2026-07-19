import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/modules/auth/roles.decorator';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { UserRole } from 'src/dtos/auth/role.enum';
import { NoticeDTO } from 'src/dtos/notice.dto';
import { NoticeType } from 'src/dtos/notice_type.enum';
import { currentDateInBangladesh } from 'src/utility/bangladesh-date.util';
import { SendMemberNoticeService } from '../service/sendMemberNotice.service';

const MEMBER_NOTICE_TYPE_LABELS: Record<NoticeType, string> = {
  [NoticeType.ANNOUCEMENT]: 'Announcement',
  [NoticeType.SHOPPING_REQ]: 'Bazar request',
  [NoticeType.MEAL_REPORT]: 'Meal report',
  [NoticeType.OFF_MEAL]: 'Off meal',
  [NoticeType.OTHER]: 'Other',
};

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(UserRole.MEMBER)
@Controller('member')
export class SendMemberNoticeController {
  constructor(
    private readonly sendMemberNoticeService: SendMemberNoticeService,
  ) {}

  @Post('sendNotice')
  @UsePipes(new ValidationPipe())
  sendNotice(@Body() info: NoticeDTO, @Request() req) {
    const userID = req.user.userID;
    const label = MEMBER_NOTICE_TYPE_LABELS[info.notice_type];
    const title = `${label} — ${currentDateInBangladesh()}`;

    return this.sendMemberNoticeService.sendNotice(
      title,
      info.description,
      info.notice_type,
      userID,
    );
  }
}
