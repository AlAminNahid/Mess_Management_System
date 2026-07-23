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
import { DeclineInviteService } from '../service/declineInvite.service';

@UseGuards(AuthGuard('jwt'))
@Controller('mess')
export class DeclineInviteController {
  constructor(private readonly declineInviteService: DeclineInviteService) {}

  @Patch('declineInvite')
  @UsePipes(new ValidationPipe())
  declineInvite(@Body() info: RespondInviteDTO, @Request() req) {
    return this.declineInviteService.declineInvite(
      req.user.userID,
      info.inviteId,
    );
  }
}
