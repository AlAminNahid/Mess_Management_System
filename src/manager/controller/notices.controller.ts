import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Request,
  Param,
  Get
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from 'src/dtos/auth/role.enum';
import { NoticesService } from '../services/notices.service';
import { NoticeDTO } from 'src/dtos/notice.dto';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(UserRole.MANAGER)
@Controller()
export class NoticesController {
  constructor(
    private readonly noticesService: NoticesService
  ) {}

  @Post('sendNotice')
  @UsePipes(new ValidationPipe())
  sendNotice(@Body() info: NoticeDTO, @Request() req) {
    const userID = req.user.userID;
    return this.noticesService.sendNotice(
      info.title,
      info.description,
      info.notice_type,
      userID,
    );
  }

  @Get('getNotices/:messID')
  getNotices(@Param('messID') messID: number, @Request() req) {
    const userID = req.user.userID;
    return this.noticesService.getNotices(messID, userID);
  }
}
