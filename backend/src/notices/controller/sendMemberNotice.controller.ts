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
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from 'src/dtos/auth/role.enum';
import { NoticeDTO } from 'src/dtos/notice.dto';
import { SendMemberNoticeService } from '../service/sendMemberNotice.service';

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
    const noticeType = 'shopping_request';
    return this.sendMemberNoticeService.sendNotice(
      info.title,
      info.description,
      noticeType,
      userID,
    );
  }
}
