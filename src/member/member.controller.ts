import {
  Controller,
  UseGuards,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from 'src/dtos/role.enum';
import { MemberService } from './member.service';
import { NoticeDTO } from 'src/dtos/notice.dto';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(UserRole.MEMBER)
@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get('dashboard')
  getMemberDashboard(): string {
    return this.memberService.getMemberDashboard();
  }

  @Post('sendNotice')
  @UsePipes(new ValidationPipe())
  sendNotice(@Body() info: NoticeDTO, @Request() req) {
    const userID = req.user.userID;
    const notice_type = 'shopping_request'
    return this.memberService.sendNotice(
      info.title,
      info.description,
      notice_type,
      userID,
    );
  }

  
}
