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
import { RespondInviteDTO } from 'src/dtos/messes.dto';
import { AcceptInviteService } from '../service/acceptInvite.service';

@UseGuards(AuthGuard('jwt'))
@Controller('mess')
export class AcceptInviteController {
  constructor(private readonly acceptInviteService: AcceptInviteService) {}

  @Patch('acceptInvite')
  @UsePipes(new ValidationPipe())
  acceptInvite(@Body() info: RespondInviteDTO, @Request() req) {
    return this.acceptInviteService.acceptInvite(
      req.user.userID,
      info.inviteId,
    );
  }
}
