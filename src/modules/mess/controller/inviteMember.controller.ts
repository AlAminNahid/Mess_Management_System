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
import { InviteMemberDTO } from 'src/dtos/messes.dto';
import { InviteMemberService } from '../service/inviteMember.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(UserRole.MANAGER)
@Controller('mess')
export class InviteMemberController {
  constructor(private readonly inviteMemberService: InviteMemberService) {}

  @Post('inviteMember')
  @UsePipes(new ValidationPipe())
  inviteMember(@Body() info: InviteMemberDTO, @Request() req) {
    return this.inviteMemberService.inviteMember(req.user.userID, info.email);
  }
}
