import { Controller, Get, UseGuards } from '@nestjs/common';
import { MemberService } from './member.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/dtos/role.enum';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('member')
export class MemberController {
    constructor(private readonly memberService : MemberService){}

    @Get('dashboard')
    @Roles(UserRole.MEMBER)
    getMemberDashboard() : string {
        return this.memberService.getMemberDashboard();
    }
}
