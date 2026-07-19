import {
  Body,
  Controller,
  Patch,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { Roles } from 'src/modules/auth/roles.decorator';
import { UserRole } from 'src/dtos/auth/role.enum';
import {
  ChangeMessPasswordDTO,
  ViewMessPasswordDTO,
} from 'src/dtos/messes.dto';
import { MessPasswordService } from '../service/messPassword.service';

@Controller('mess')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(UserRole.MANAGER)
export class MessPasswordController {
  constructor(private readonly messPasswordService: MessPasswordService) {}

  @Post('messPassword')
  @UsePipes(new ValidationPipe())
  viewMessPassword(@Body() info: ViewMessPasswordDTO, @Request() req) {
    return this.messPasswordService.viewMessPassword(
      req.user.userID,
      info.accountPassword,
    );
  }

  @Patch('changeMessPassword')
  @UsePipes(new ValidationPipe())
  changeMessPassword(@Body() info: ChangeMessPasswordDTO, @Request() req) {
    return this.messPasswordService.changeMessPassword(
      req.user.userID,
      info.accountPassword,
      info.newMessPassword,
    );
  }
}
