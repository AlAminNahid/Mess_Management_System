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
import { SendNoticeService } from '../service/sendNotice.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(UserRole.MANAGER)
@Controller()
export class SendNoticeController {
  constructor(private readonly sendNoticeService: SendNoticeService) {}

  @Post('sendNotice')
  @UsePipes(new ValidationPipe())
  sendNotice(@Body() info: NoticeDTO, @Request() req) {
    const userID = req.user.userID;
    return this.sendNoticeService.sendNotice(
      info.title,
      info.description,
      info.notice_type,
      userID,
    );
  }
}
