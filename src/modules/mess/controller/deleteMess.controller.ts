import {
  Body,
  Controller,
  Delete,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/modules/auth/roles.decorator';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { UserRole } from 'src/dtos/auth/role.enum';
import { DeleteMessDTO } from 'src/dtos/messes.dto';
import { DeleteMessService } from '../service/deleteMess.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(UserRole.MANAGER)
@Controller('mess')
export class DeleteMessController {
  constructor(private readonly deleteMessService: DeleteMessService) {}

  @Delete('deleteMess')
  @UsePipes(new ValidationPipe())
  deleteMess(@Body() info: DeleteMessDTO, @Request() req) {
    return this.deleteMessService.deleteMess(
      req.user.userID,
      info.accountPassword,
    );
  }
}
