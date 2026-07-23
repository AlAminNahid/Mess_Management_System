import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/modules/auth/roles.decorator';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { UserRole } from 'src/dtos/auth/role.enum';
import { SearchUserByEmailDTO } from 'src/dtos/messes.dto';
import { SearchUserByEmailService } from '../service/searchUserByEmail.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(UserRole.MANAGER)
@Controller('mess')
export class SearchUserByEmailController {
  constructor(
    private readonly searchUserByEmailService: SearchUserByEmailService,
  ) {}

  @Get('searchUserByEmail')
  searchUserByEmail(
    @Query() query: SearchUserByEmailDTO,
    @Request() req,
  ) {
    return this.searchUserByEmailService.searchUserByEmail(
      req.user.userID,
      query.email,
    );
  }
}
