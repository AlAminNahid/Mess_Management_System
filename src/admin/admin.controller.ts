import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/dtos/role.enum';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('admin')
export class AdminController {
    constructor(private readonly adminService : AdminService){}
    
    @Get('dashboard')
    @Roles(UserRole.ADMIN)
    getAdminDashboard() : string {
        return this.adminService.getAdminDashboard();
    }
}
