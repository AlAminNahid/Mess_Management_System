import {
  Body,
  Controller,
  Patch,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/modules/auth/roles.decorator';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { UserRole } from 'src/dtos/auth/role.enum';
import { RemoveMemberDTO } from 'src/dtos/messes.dto';
import { RemoveMemberService } from '../service/removeMember.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(UserRole.MANAGER)
@Controller('mess')
export class RemoveMemberController {
  constructor(private readonly removeMemberService: RemoveMemberService) {}

  @Patch('removeMember')
  @UsePipes(new ValidationPipe())
  removeMember(@Body() info: RemoveMemberDTO, @Request() req) {
    return this.removeMemberService.removeMember(
      req.user.userID,
      info.memberId,
    );
  }
}
