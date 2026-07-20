import {
  Body,
  Controller,
  Patch,
  Request,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { Roles } from 'src/modules/auth/roles.decorator';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { UserRole } from 'src/dtos/auth/role.enum';
import { TransferOwnershipDTO } from 'src/dtos/messes.dto';
import { setAuthCookies } from 'src/utility/cookie.util';
import { TransferOwnershipService } from '../service/transferOwnership.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(UserRole.MANAGER)
@Controller('mess')
export class TransferOwnershipController {
  constructor(
    private readonly transferOwnershipService: TransferOwnershipService,
    private readonly config: ConfigService,
  ) {}

  @Patch('transferOwnership')
  @UsePipes(new ValidationPipe())
  async transferOwnership(
    @Body() info: TransferOwnershipDTO,
    @Request() req,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, refresh_token, ...result } =
      await this.transferOwnershipService.transferOwnership(
        req.user.userID,
        info.targetMemberId,
      );

    setAuthCookies(res, this.config, access_token, refresh_token);

    return result;
  }
}
